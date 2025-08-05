import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { debounceTime, distinctUntilChanged, switchMap, Subject } from 'rxjs';
import L from 'leaflet';
import { NominatimResult ,LocationMap} from './interface/location';
import { GeocodingService } from './Service/geocoding-service';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-map',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './map.html',
  styleUrl: './map.scss'
})
export class Map {
  @Input() title: string = 'Location';
  @Input() selectedLocation: LocationMap | null = null;
  @Output() locationSelected = new EventEmitter<LocationMap>();
  @Output() locationCleared = new EventEmitter<void>();

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  private map: any;
  private marker: any;
  private searchSubject = new Subject<string>();

  searchTerm: string = '';
  searchResults: NominatimResult[] = [];

  constructor(private geocodingService: GeocodingService) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.geocodingService.searchAddresses(term))
    ).subscribe(results => {
      this.searchResults = results;
    });
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      import('leaflet').then(leafletModule => {
        const L = leafletModule.default;
        this.initializeMap(L);
      });
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  private initializeMap(L: any) {
    const egyptBounds = this.geocodingService.getEgyptBounds();
    this.map = L.map(this.mapContainer.nativeElement).setView([30.0444, 31.2357], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    const bounds = L.latLngBounds(
      L.latLng(egyptBounds.south, egyptBounds.west),
      L.latLng(egyptBounds.north, egyptBounds.east)
    );

    this.map.setMaxBounds(bounds);
    this.map.fitBounds(bounds);

    this.map.on('click', (e: any) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      if (this.isWithinEgyptBounds(lat, lng)) {
        this.onMapClick(L, lat, lng);
      } else {
        console.warn('Selected location is outside Egypt bounds');
      }
    });

    if (this.selectedLocation) {
      this.setMapLocation(L, this.selectedLocation);
    }
  }

  private isWithinEgyptBounds(lat: number, lng: number): boolean {
    const bounds = this.geocodingService.getEgyptBounds();
    return lat >= bounds.south && lat <= bounds.north &&
           lng >= bounds.west && lng <= bounds.east;
  }

  private onMapClick(L: any, lat: number, lng: number) {
    this.geocodingService.reverseGeocode(lat, lng).subscribe(address => {
      const location: LocationMap = { lat, lng, address };
      this.setMapLocation(L, location);
      this.locationSelected.emit(location);
    });
  }

  private setMapLocation(L: any, location: LocationMap) {
    if (!this.isWithinEgyptBounds(location.lat, location.lng)) {
      console.warn('Location is outside Egypt bounds');
      return;
    }

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker([location.lat, location.lng], {
      icon: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    }).addTo(this.map);

    this.marker.bindPopup(location.address).openPopup();
    this.map.setView([location.lat, location.lng], 15);
    this.selectedLocation = location;
  }

  onSearchInput(event: any) {
    const term = event.target.value;
    this.searchTerm = term;
    this.searchSubject.next(term);
  }

  selectSearchResult(result: NominatimResult) {
    const location: LocationMap = {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      address: this.geocodingService.formatAddress(result),
      displayName: result.display_name
    };

    import('leaflet').then(leafletModule => {
      const L = leafletModule.default;
      this.setMapLocation(L, location);
      this.locationSelected.emit(location);
      this.searchResults = [];
      this.searchTerm = '';
    });
  }

  clearSearch() {
    this.searchTerm = '';
    this.searchResults = [];
  }

  clearLocation() {
    if (this.marker) {
      this.map.removeLayer(this.marker);
      this.marker = null;
    }
    this.selectedLocation = null;
    this.locationCleared.emit();
  }

  trackByPlaceId(index: number, result: NominatimResult): string {
    return result.place_id;
  }

  getResultTitle(result: NominatimResult): string {
    const parts = result.display_name.split(',').map(part => part.trim());
    const filteredParts = parts.filter(part =>
      !part.toLowerCase().includes('egypt') &&
      !part.toLowerCase().includes('مصر') &&
      part.length > 1
    );
    return filteredParts[0] || parts[0];
  }

  getResultSubtitle(result: NominatimResult): string {
    const parts = result.display_name.split(',').map(part => part.trim());
    const filteredParts = parts.filter(part =>
      !part.toLowerCase().includes('egypt') &&
      !part.toLowerCase().includes('مصر') &&
      part.length > 1
    );
    return filteredParts.slice(1, 3).join(', ') || parts.slice(1, 3).join(', ');
  }
}
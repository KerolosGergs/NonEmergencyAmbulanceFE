import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITrip } from '../../../../Core/interface/Trip/itrip';
import { GeocodingService } from '../../../reservation-from/map/Service/geocoding-service';

@Component({
  selector: 'app-trip-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-tracker.html',
  styleUrls: ['./trip-tracker.scss']
})
export class TripTracker implements OnInit {
  @Input() trip!: ITrip;
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  private map: any;
  private pickupMarker: any;
  private dropoffMarker: any;
  private polyline: any;

  loading = true;
  showMap = true;

  constructor(private geocoding: GeocodingService) {}

  ngOnInit(): void {
    if (!this.trip) {
      this.loading = false;
      this.showMap = false;
      return;
    }

    // Geocode first; only show map when we have at least one location
    Promise.all([
      this.forwardGeocode(this.trip.pickupAddress),
      this.forwardGeocode(this.trip.dropOffAddress)
    ]).then(results => {
      const [pickup, dropoff] = results;
      if (!pickup && !dropoff) {
        // Don't show error UI; just hide map gracefully
        this.showMap = false;
        this.loading = false;
        return;
      }
      if (typeof window !== 'undefined') {
        import('leaflet').then(leafletModule => {
          const L = leafletModule.default;
          this.initMap(L);
          this.addMarkersAndFit(L, pickup || null, dropoff || null);
          this.loading = false;
        });
      }
    }).catch(() => {
      this.showMap = false;
      this.loading = false;
    });
  }

  private initMap(L: any) {
    const bounds = this.geocoding.getEgyptBounds();
    this.map = L.map(this.mapContainer.nativeElement, {
      zoomControl: true,
    }).setView([30.0444, 31.2357], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    const maxBounds = L.latLngBounds(
      L.latLng(bounds.south, bounds.west),
      L.latLng(bounds.north, bounds.east)
    );
    this.map.setMaxBounds(maxBounds);
  }

  private addMarkersAndFit(L: any, pickup: {lat:number; lng:number} | null, dropoff: {lat:number; lng:number} | null) {
    const markers: any[] = [];
    if (pickup) {
      this.pickupMarker = L.marker([pickup.lat, pickup.lng], {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41], iconAnchor: [12, 41]
        })
      }).addTo(this.map).bindPopup('Pickup: ' + this.trip.pickupAddress);
      markers.push([pickup.lat, pickup.lng]);
    }
    if (dropoff) {
      this.dropoffMarker = L.marker([dropoff.lat, dropoff.lng], {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41], iconAnchor: [12, 41]
        })
      }).addTo(this.map).bindPopup('Drop-off: ' + this.trip.dropOffAddress);
      markers.push([dropoff.lat, dropoff.lng]);
    }

    if (pickup && dropoff) {
      this.polyline = L.polyline([[pickup.lat, pickup.lng], [dropoff.lat, dropoff.lng]], {
        color: '#3b82f6', weight: 4, opacity: 0.8
      }).addTo(this.map);
    }

    // Fit bounds to available markers or center on single marker
    if (markers.length === 2) {
      const mapBounds = L.latLngBounds(markers as any);
      this.map.fitBounds(mapBounds, { padding: [30, 30] });
    } else if (markers.length === 1) {
      this.map.setView(markers[0] as any, 14);
    }
  }

  private async forwardGeocode(address: string): Promise<{ lat: number; lng: number } | null> {
    return new Promise(resolve => {
      this.geocoding.searchAddresses(address).subscribe(results => {
        if (results && results.length > 0) {
          resolve({ lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) });
        } else {
          resolve(null);
        }
      }, _ => resolve(null));
    });
  }

  recenter(): void {
    if (!this.map) return;
    const points: [number, number][] = [];
    if (this.pickupMarker) {
      const p = this.pickupMarker.getLatLng?.();
      if (p) points.push([p.lat, p.lng]);
    }
    if (this.dropoffMarker) {
      const d = this.dropoffMarker.getLatLng?.();
      if (d) points.push([d.lat, d.lng]);
    }
    if (points.length === 2) {
      // @ts-ignore
      const L = (window as any).L || null;
      if (L) {
        const bounds = L.latLngBounds(points);
        this.map.fitBounds(bounds, { padding: [30, 30] });
      } else {
        this.map.setView(points[0], 14);
      }
    } else if (points.length === 1) {
      this.map.setView(points[0], 14);
    }
  }
}

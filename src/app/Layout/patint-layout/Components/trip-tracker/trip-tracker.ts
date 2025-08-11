import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, OnDestroy } from '@angular/core';
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
export class TripTracker implements OnInit, OnChanges, OnDestroy {
  @Input() trip!: ITrip | null;
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  private map: any;
  private L: any;
  private routingControl: any;
  private pickupMarker: any;
  private dropoffMarker: any;

  loading = true;
  showMap = true;

  constructor(private geocoding: GeocodingService) {}

  ngOnInit(): void {
    // don’t initialize here; wait for trip in ngOnChanges
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trip' in changes) {
      if (this.trip && this.trip.pickupAddress && this.trip.dropOffAddress) {
        this.buildOnceAndRender();
      } else {
        // no trip yet: show loader until it arrives
        this.loading = true;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  private async buildOnceAndRender() {
    try {
      // lazy-load Leaflet + routing plugin once
      if (!this.L) {
        const leafletModule = await import('leaflet');
        this.L = leafletModule.default ?? (leafletModule as any);
        // Optional: fix default icon paths if needed
        // await import('leaflet/dist/leaflet.css');
        (window as any).L = this.L;

        // Leaflet Routing Machine (uses OSRM demo server by default)
        // await import('leaflet-routing-machine');
        // await import('leaflet-routing-machine/dist/leaflet-routing-machine.css');
      }

      // geocode both ends
      const [pickup, dropoff] = await Promise.all([
        this.forwardGeocode(this.trip!.pickupAddress),
        this.forwardGeocode(this.trip!.dropOffAddress)
      ]);

      if (!pickup && !dropoff) {
        this.showMap = false;
        this.loading = false;
        return;
      }

      // init map if needed
      if (!this.map) {
        this.initMap();
      }

      // add markers
      this.addMarkers(pickup, dropoff);

      // draw route if both points exist, else just center on the single point
      if (pickup && dropoff) {
        this.drawRoute(pickup, dropoff);
      } else {
        const target = pickup ?? dropoff!;
        this.map.setView([target.lat, target.lng], 14);
      }

      this.loading = false;

      // fix sizing after first paint
      setTimeout(() => this.map?.invalidateSize?.(), 0);
    } catch (err) {
      console.error('TripTracker error:', err);
      this.showMap = false;
      this.loading = false;
    }
  }

  private initMap() {
    const L = this.L;
    this.map = L.map(this.mapContainer.nativeElement, { zoomControl: true })
      .setView([30.0444, 31.2357], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Optional: constrain to Egypt-ish bounds if you like
    // const b = this.geocoding.getEgyptBounds();
    // this.map.setMaxBounds(L.latLngBounds([b.south, b.west], [b.north, b.east]));
  }

  private addMarkers(
    pickup: { lat: number; lng: number } | null,
    dropoff: { lat: number; lng: number } | null
  ) {
    const L = this.L;

    if (this.pickupMarker) this.map.removeLayer(this.pickupMarker);
    if (this.dropoffMarker) this.map.removeLayer(this.dropoffMarker);

    if (pickup) {
      this.pickupMarker = L.marker([pickup.lat, pickup.lng], {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41]
        })
      }).addTo(this.map).bindPopup('Pickup: ' + this.trip!.pickupAddress);
    }

    if (dropoff) {
      this.dropoffMarker = L.marker([dropoff.lat, dropoff.lng], {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41]
        })
      }).addTo(this.map).bindPopup('Drop-off: ' + this.trip!.dropOffAddress);
    }
  }

  private drawRoute(
    pickup: { lat: number; lng: number },
    dropoff: { lat: number; lng: number }
  ) {
    const L = this.L;

    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
      this.routingControl = null;
    }

    this.routingControl = (L as any).Routing.control({
      waypoints: [
        L.latLng(pickup.lat, pickup.lng),
        L.latLng(dropoff.lat, dropoff.lng)
      ],
      routeWhileDragging: false,
      showAlternatives: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,  // auto-zoom to the route
      show: false               // hide the turn-by-turn panel
    }).addTo(this.map);
  }

  private forwardGeocode(address: string): Promise<{ lat: number; lng: number } | null> {
    return new Promise(resolve => {
      if (!address || !address.trim()) return resolve(null);
      this.geocoding.searchAddresses(address).subscribe(
        results => {
          if (results?.length > 0) {
            resolve({ lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) });
          } else {
            resolve(null);
          }
        },
        _ => resolve(null)
      );
    });
  }

  recenter(): void {
    if (!this.map) return;

    // If a route exists, fit to it; else fall back to markers.
    if (this.routingControl?.getPlan) {
      const routes = this.routingControl._routes; // LRM keeps routes internally
      if (routes?.length) {
        const bounds = routes[0].bounds;
        if (bounds) {
          this.map.fitBounds(bounds, { padding: [30, 30] });
          return;
        }
      }
    }

    const pts: [number, number][] = [];
    if (this.pickupMarker?.getLatLng) {
      const p = this.pickupMarker.getLatLng(); pts.push([p.lat, p.lng]);
    }
    if (this.dropoffMarker?.getLatLng) {
      const d = this.dropoffMarker.getLatLng(); pts.push([d.lat, d.lng]);
    }
    if (pts.length === 2) {
      const b = this.L.latLngBounds(pts); this.map.fitBounds(b, { padding: [30, 30] });
    } else if (pts.length === 1) {
      this.map.setView(pts[0], 14);
    }
  }
}

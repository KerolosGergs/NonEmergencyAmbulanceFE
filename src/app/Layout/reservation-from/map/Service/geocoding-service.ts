import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { NominatimResult } from '../interface/location';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
   private readonly nominatimUrl = 'https://nominatim.openstreetmap.org';
  
  // Egypt bounding box coordinates
  private readonly egyptBounds = {
    south: 22.0,    // Southern border
    north: 31.7,    // Northern border (Mediterranean)
    west: 25.0,     // Western border
    east: 35.0      // Eastern border (Red Sea)
  };

  constructor(private http: HttpClient) {}

  searchAddresses(query: string): Observable<NominatimResult[]> {
    if (!query || query.length < 3) {
      return of([]);
    }

    const params = {
      q: query,
      format: 'json',
      addressdetails: '1',
      limit: '5',
      countrycodes: 'eg', // Egypt only
      bounded: '1',
      viewbox: `${this.egyptBounds.west},${this.egyptBounds.south},${this.egyptBounds.east},${this.egyptBounds.north}`
    };

    return this.http.get<NominatimResult[]>(`${this.nominatimUrl}/search`, { params })
      .pipe(
        map(results => results.filter(result => this.isInEgypt(result))),
        catchError(error => {
          console.error('Geocoding error:', error);
          return of([]);
        })
      );
  }

  private isInEgypt(result: NominatimResult): boolean {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    
    return lat >= this.egyptBounds.south && 
           lat <= this.egyptBounds.north && 
           lon >= this.egyptBounds.west && 
           lon <= this.egyptBounds.east;
  }

  reverseGeocode(lat: number, lng: number): Observable<string> {
    // Check if coordinates are within Egypt bounds
    if (!this.isCoordinateInEgypt(lat, lng)) {
      return of(`${lat}, ${lng} (Outside Egypt)`);
    }

    const params = {
      lat: lat.toString(),
      lon: lng.toString(),
      format: 'json',
      addressdetails: '1',
      countrycodes: 'eg'
    };

    return this.http.get<any>(`${this.nominatimUrl}/reverse`, { params })
      .pipe(
        map(result => result.display_name || `${lat}, ${lng}`),
        catchError(error => {
          console.error('Reverse geocoding error:', error);
          return of(`${lat}, ${lng}`);
        })
      );
  }

  private isCoordinateInEgypt(lat: number, lng: number): boolean {
    return lat >= this.egyptBounds.south && 
           lat <= this.egyptBounds.north && 
           lng >= this.egyptBounds.west && 
           lng <= this.egyptBounds.east;
  }

  getEgyptBounds() {
    return this.egyptBounds;
  }

  formatAddress(result: NominatimResult): string {
    // Enhanced formatting for Egyptian addresses
    const parts = result.display_name.split(',').map(part => part.trim());
    
    // Try to extract meaningful parts for Egyptian addresses
    const filteredParts = parts.filter(part => 
      !part.toLowerCase().includes('egypt') && 
      !part.toLowerCase().includes('مصر') &&
      part.length > 1
    );
    
    return filteredParts.slice(0, 4).join(', ');
  }
}
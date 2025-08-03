// import { Injectable } from '@angular/core';
// import { Loader } from '@googlemaps/js-api-loader';
// import { LocationPoint } from '../Models/ireservation';

// @Injectable({
//   providedIn: 'root'
// })
// export class Maps {
//  private loader: Loader;
//   private map?: google.maps.Map;
//   private geocoder?: google.maps.Geocoder;

//   constructor() {
//     this.loader = new Loader({
//       apiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your actual API key
//       version: 'weekly',
//       libraries: ['places', 'geometry']
//     });
//   }

//   async initializeMap(mapElement: HTMLElement): Promise<google.maps.Map> {
//     const google = await this.loader.load();
    
//     this.map = new google.maps.Map(mapElement, {
//       center: { lat: 40.7128, lng: -74.0060 }, // Default to New York
//       zoom: 12,
//       styles: [
//         {
//           featureType: 'poi.business',
//           stylers: [{ visibility: 'off' }]
//         }
//       ]
//     });

//     this.geocoder = new google.maps.Geocoder();
//     return this.map;
//   }

//   async geocodeAddress(address: string): Promise<LocationPoint | null> {
//     if (!this.geocoder) {
//       throw new Error('Geocoder not initialized');
//     }

//     return new Promise((resolve, reject) => {
//       this.geocoder!.geocode({ address }, (results, status) => {
//         if (status === 'OK' && results && results[0]) {
//           const location = results[0].geometry.location;
//           resolve({
//             lat: location.lat(),
//             lng: location.lng(),
//             address: results[0].formatted_address
//           });
//         } else {
//           resolve(null);
//         }
//       });
//     });
//   }

//   addMarker(location: LocationPoint, title: string, color: string): google.maps.Marker | null {
//     if (!this.map) return null;

//     return new google.maps.Marker({
//       position: { lat: location.lat, lng: location.lng },
//       map: this.map,
//       title,
//       icon: {
//         url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
//             <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
//           </svg>
//         `)}`
//       }
//     });
//   }

//   fitMapToMarkers(markers: google.maps.Marker[]): void {
//     if (!this.map || markers.length === 0) return;

//     const bounds = new google.maps.LatLngBounds();
//     markers.forEach(marker => {
//       const position = marker.getPosition();
//       if (position) bounds.extend(position);
//     });

//     this.map.fitBounds(bounds);
//   }
// }
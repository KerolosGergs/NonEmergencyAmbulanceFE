import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ITripData } from '../../interface/itrip-data';
import { Observable } from 'rxjs';
import { Environment } from '../../../../environments/environment';
import { ITrip } from '../../interface/Trip/itrip';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private http = inject(HttpClient);
  private api = Environment.apiUrl + '/Trip';

  /** Get trips for a driver */
  getTripsForDriver(driverId: number): Observable<GenerialResponse<ITrip[]>> {
    return this.http.get<GenerialResponse<ITrip[]>>(`${this.api}/driver/${driverId}`);
  }

  /** Get trips for a nurse */
  getTripsForNurse(nurseId: number): Observable<GenerialResponse<ITrip[]>> {
    return this.http.get<GenerialResponse<ITrip[]>>(`${this.api}/nurse/${nurseId}`);
  }

  /** Get trip by request ID */
  getTripByRequestId(requestId: number): Observable<GenerialResponse<ITrip>> {
    return this.http.get<GenerialResponse<ITrip>>(`${this.api}/request/${requestId}`);
  }

  /** Create trip from request ID */
  createTrip(requestId: number): Observable<GenerialResponse<ITrip>> {
    return this.http.post<GenerialResponse<ITrip>>(`${this.api}/create/${requestId}`, {});
  }

  /** Start a trip */
  startTrip(tripId: number): Observable<GenerialResponse<any>> {
    return this.http.put<GenerialResponse<any>>(`${this.api}/${tripId}/start`, {});
  }

  /** Complete a trip */
  completeTrip(tripId: number): Observable<GenerialResponse<any>> {
    return this.http.put<GenerialResponse<any>>(`${this.api}/${tripId}/complete`, {});
  }
}

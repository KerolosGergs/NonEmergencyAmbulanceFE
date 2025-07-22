import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRequestData } from '../../interface/irequest';
import { Observable } from 'rxjs';
import { Environment } from '../../../../environments/environment';
import { ITripData } from '../../interface/itrip-data';
import { IDriver } from '../../interface/Driver/IDriver';

@Injectable({
  providedIn: 'root'
})
export class Driver {
  _httpClient= inject(HttpClient);

  GetUnassignedRequestsForDriver(): Observable<IRequestData[]> {
    return this._httpClient.get<IRequestData[]>(Environment.apiUrl + '/Request/available-for-driver');
  }

  assignNurseToRequest(requestId: number, driverId: number): Observable<any> {
    const body = { requestId, driverId };
    return this._httpClient.put(Environment.apiUrl + '/Request/assign-driver', body);
  }

  getTripsByDriverId(driverId: number): Observable<ITripData[]> {
    return this._httpClient.get<ITripData[]>(Environment.apiUrl + `/Trip/driver/${driverId}`);
  }

  getdriverById(driverId: number): Observable<IDriver> {
    return this._httpClient.get<IDriver>(Environment.apiUrl + `/Driver/${driverId}`);
  }


}

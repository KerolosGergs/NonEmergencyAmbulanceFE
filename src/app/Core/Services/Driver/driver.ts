import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRequestData } from '../../interface/irequest';
import { Observable } from 'rxjs';
import { Environment } from '../../../../environments/environment';
import { ITripData } from '../../interface/itrip-data';
import { IDriver, IDriverRegister } from '../../interface/Driver/IDriver';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  Api = Environment.apiUrl+'/Driver';
  _httpClient= inject(HttpClient);

  // GetUnassignedRequestsForDriver(): Observable<IRequestData[]> {
  //   return this._httpClient.get<IRequestData[]>(Environment.apiUrl + '/Request/available-for-driver');
  // }

  // assignNurseToRequest(requestId: number, driverId: number): Observable<any> {
  //   const body = { requestId, driverId };
  //   return this._httpClient.put(Environment.apiUrl + '/Request/assign-driver', body);
  // }

  // getTripsByDriverId(driverId: number): Observable<ITripData[]> {
  //   return this._httpClient.get<ITripData[]>(Environment.apiUrl + `/Trip/driver/${driverId}`);
  // }

  // getdriverById(driverId: number): Observable<IDriver> {
  //   return this._httpClient.get<IDriver>(Environment.apiUrl + `/Driver/${driverId}`);
  // }
  /// my Api 
  getDrivers(): Observable<GenerialResponse<IDriver[]>> {
    return this._httpClient.get<GenerialResponse<IDriver[]>>(this.Api);
  }
  postDriver(Driver: IDriverRegister): Observable<GenerialResponse<any>> {
    return this._httpClient.post<GenerialResponse<any>>(this.Api , Driver);
  }
  getById(id: number): Observable<GenerialResponse<IDriver>> {
    return this._httpClient.get<GenerialResponse<IDriver>>(this.Api + '/' + id);
  }
  updateDriver(id: number, value: IDriver) : Observable<GenerialResponse<any>> {
    return this._httpClient.patch<GenerialResponse<any>>(this.Api + '/' + id, value);
  }
  deleteDriver(id: number) : Observable<GenerialResponse<any>> {
    return this._httpClient.delete<GenerialResponse<any>>(this.Api + '/' + id);
  }
  toggleAvailability(id: number, isAvailable: boolean): Observable<GenerialResponse<any>> {
    return this._httpClient.patch<GenerialResponse<any>>(this.Api + '/' + id+'/toggle-availability', { isAvailable });
  }
}

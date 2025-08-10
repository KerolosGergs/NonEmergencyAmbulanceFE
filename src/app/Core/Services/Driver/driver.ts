import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRequestData } from '../../interface/irequest';
import { map, Observable } from 'rxjs';
import { Environment } from '../../../../environments/environment';
import { ITripData } from '../../interface/itrip-data';
<<<<<<< Updated upstream
import { IDriver } from '../../interface/Driver/IDriver';
=======
import { IDriver, IDriverRegister } from '../../interface/Driver/IDriver';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';
import { response } from 'express';
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
  getdriverById(driverId: number): Observable<IDriver> {
    return this._httpClient.get<IDriver>(Environment.apiUrl + `/Driver/${driverId}`);
=======
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
    return this._httpClient.get<GenerialResponse<IDriver>>(this.Api + '/' + id).pipe(
      map((response:GenerialResponse<IDriver>)=>{
        response.data.imgUrl = Environment.ImgUrl + response.data.imgUrl;
        return response;
      }
    )
    );
  }
  updateDriver(id: number, value: IDriver) : Observable<GenerialResponse<any>> {
    return this._httpClient.patch<GenerialResponse<any>>(this.Api + '/' + id, value);
  }
  deleteDriver(id: number) : Observable<GenerialResponse<any>> {
    return this._httpClient.delete<GenerialResponse<any>>(this.Api + '/' + id);
  }
  toggleAvailability(id: number, isAvailable: boolean): Observable<GenerialResponse<any>> {
    return this._httpClient.patch<GenerialResponse<any>>(this.Api + '/' + id+'/toggle-availability', { isAvailable });
>>>>>>> Stashed changes
  }


}

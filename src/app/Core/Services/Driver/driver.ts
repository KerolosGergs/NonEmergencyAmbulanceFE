import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRequestData } from '../../interface/irequest';
import { map, Observable } from 'rxjs';
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


  /// my Api

    /**
   * Sends a PATCH request to update the availability status of a specific driver.
   * @param id The ID of the driver to update.
   * @param isAvailable The new availability status.
   * @returns An Observable with the server's response.
   */
  getDrivers(): Observable<GenerialResponse<IDriver[]>> {
    return this._httpClient.get<GenerialResponse<IDriver[]>>(this.Api);
  }
  postDriver(Driver: IDriverRegister): Observable<GenerialResponse<any>> {
    return this._httpClient.post<GenerialResponse<any>>(this.Api , Driver);
  }
  getById(id: number): Observable<GenerialResponse<IDriver>> {
    return this._httpClient.get<GenerialResponse<IDriver>>(this.Api + '/' + id).pipe(
      map((response: GenerialResponse<IDriver>) =>{
              response.data.imgUrl = `${Environment.ImgUrl}${response.data.imgUrl}`
              return response
            })
    );
  }
  updateDriver(id: number, value: IDriver) : Observable<GenerialResponse<any>> {
    return this._httpClient.put<GenerialResponse<any>>(this.Api + '/' + id, value);
  }
  deleteDriver(id: number) : Observable<GenerialResponse<any>> {
    return this._httpClient.delete<GenerialResponse<any>>(this.Api + '/' + id);
  }
  toggleAvailability(id: number, isAvailable: boolean): Observable<GenerialResponse<any>> {
    return this._httpClient.patch<GenerialResponse<any>>(this.Api + '/' + id+'/toggle-availability', { isAvailable });
  }
}

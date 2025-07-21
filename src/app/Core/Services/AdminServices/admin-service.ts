import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginResponse } from '../../interface/login';
import { IBooking } from '../../interface/request-data';
import { Environment } from '../../../../environments/environment';
import { DriverWithId, FromResponse } from '../../interface/FormsInterface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  
  constructor() { }
  _ = inject(HttpClient);
 getAllBookings():Observable<IBooking[]>{
    return this._.get<IBooking[]>(Environment.apiUrl+'/Request');
  }

  addDriver(request:any):Observable<FromResponse>{
    return this._.post<FromResponse>(Environment.apiUrl+'/Authentication/register/driver', request);
  }
  addNurse(request:any):Observable<FromResponse>{
    return this._.post<FromResponse>(Environment.apiUrl+'/Authentication/register/nurse',request)

  }

    addAmbulance(value: any): Observable<FromResponse> {
    return this._.post<FromResponse>(Environment.apiUrl + '/Ambulance', value);
  }
  getDrivers(): Observable<DriverWithId[]> {
    return this._.get<DriverWithId[]>(Environment.apiUrl + '/Admin/drivers');
  }
}

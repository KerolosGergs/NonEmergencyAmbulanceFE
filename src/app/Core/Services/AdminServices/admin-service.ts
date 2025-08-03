import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBooking } from '../../interface/request-data';
import { Environment } from '../../../../environments/environment';
import { DriverWithId, FromResponse } from '../../interface/FormsInterface';
import { AdminAmbulance, AdminDriver, AdminNurse, AdminPatient, AdminRequest, AdminTrip } from '../../interface/Admin/iadmin';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  
  constructor() { }
  _ = inject(HttpClient);



////////Done
getAdminDrivers(): Observable<GenerialResponse<AdminDriver[]>> {
  return this._.get<GenerialResponse<AdminDriver[]>>(Environment.apiUrl + '/Admin/drivers');
}

getAdminNurses(): Observable<GenerialResponse<AdminNurse[]>> {
  return this._.get<GenerialResponse<AdminNurse[]>>(Environment.apiUrl + '/Admin/nurses');
}
getAdminAmbulances(): Observable<GenerialResponse<AdminAmbulance[]>> {
  return this._.get<GenerialResponse<AdminAmbulance[]>>(Environment.apiUrl + '/Admin/ambulances');  
}

getAdminPatients(): Observable<GenerialResponse<AdminPatient[]>> {
  return this._.get<GenerialResponse<AdminPatient[]>>(Environment.apiUrl + '/Admin/patients');
}

getAdminRequests(): Observable<GenerialResponse<AdminRequest[]>> {
  return this._.get<GenerialResponse<AdminRequest[]>>(Environment.apiUrl + '/Admin/requests');
}

getAdminTrips(): Observable<GenerialResponse<AdminTrip[]>> {
  return this._.get<GenerialResponse<AdminTrip[]>>(Environment.apiUrl + '/Admin/trips');
}



}

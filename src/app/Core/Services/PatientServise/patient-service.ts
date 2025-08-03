import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';
import { Observable } from 'rxjs';
import { IPatient, PatientRequest } from '../../interface/Patient/ipatient';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  
  api = Environment.apiUrl + '/Patient'
  _ = inject(HttpClient);
  getallPatient(): Observable<GenerialResponse<IPatient[]>> {
    return this._.get<GenerialResponse<IPatient[]>>(this.api);
  }
  getPatientById(id: number): Observable<GenerialResponse<IPatient>> {
    return this._.get<GenerialResponse<IPatient>>(this.api + '/' + id);
  }
  updatePatient(id: number, value: IPatient): Observable<GenerialResponse<IPatient>> {
    return this._.put<GenerialResponse<IPatient>>(this.api + '/' + id, value);
  }
  deletePatient(id: number): Observable<GenerialResponse<any>> {
    return this._.delete<GenerialResponse<any>>(this.api + '/' + id);
  }
  getPatientRequests(): Observable<GenerialResponse<PatientRequest[]>> {
    return this._.get<GenerialResponse<PatientRequest[]>>(this.api + '/requests');
  }
  getPatientTrips(): Observable<GenerialResponse<IPatient[]>> {
    return this._.get<GenerialResponse<IPatient[]>>(this.api + '/trips');
  }
}

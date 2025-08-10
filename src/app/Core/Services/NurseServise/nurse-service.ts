import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { IRequestData } from '../../interface/irequest';
import { ITripData } from '../../interface/itrip-data';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';
import { INurse, INurseRegister } from '../../interface/Nurse/inurse';

@Injectable({
  providedIn: 'root'
})
export class NurseService {
  _httpClient = inject(HttpClient);
  api = Environment.apiUrl + '/Nurse'

  // GetUnassignedRequestsForNurse(): Observable<IRequestData[]> {
  //   return this._httpClient.get<IRequestData[]>(Environment.apiUrl + '/Request/available-for-nurse');
  // }

  // assignNurseToRequest(requestId: number, nurseId: number): Observable<any> {
  //   const body = { requestId, nurseId };
  //   return this._httpClient.put(Environment.apiUrl + '/Request/assign-nurse', body);
  // }

  //   getTripsById(nurseId: number): Observable<ITripData[]> {
  //   return this._httpClient.get<ITripData[]>(Environment.apiUrl +`/trip/nurse/${nurseId}`);
  // }
//
  getNurses(): Observable<GenerialResponse<INurse[]>> {
    return this._httpClient.get<GenerialResponse<INurse[]>>(Environment.apiUrl + '/Nurse');
  }
  postNurse(Nurse: INurseRegister): Observable<GenerialResponse<any>> {
    return this._httpClient.post<GenerialResponse<any>>(this.api, Nurse);
  }

  getById(id: number): Observable<GenerialResponse<INurse>> {
    return this._httpClient.get<GenerialResponse<INurse>>(this.api + '/' + id);
  }

  updateNurse(id: number, value: INurse) : Observable<GenerialResponse<INurse>> {
    return this._httpClient.put<GenerialResponse<INurse>>(this.api + '/' + id, value);
  }

  deleteNurse(id: number): Observable<GenerialResponse<any>> {
    return this._httpClient.delete<GenerialResponse<any>>(this.api + '/' + id);
  }
  getAvailableNurses(): Observable<GenerialResponse<INurse[]>> {
    return this._httpClient.get<GenerialResponse<INurse[]>>(this.api + '/available');
  }
  NurseAvailability(id: number, isAvailable: boolean): Observable<GenerialResponse<any>> {
    return this._httpClient.patch<GenerialResponse<any>>(this.api + '/' + id + '/toggle-availability', { isAvailable } );
  }

}

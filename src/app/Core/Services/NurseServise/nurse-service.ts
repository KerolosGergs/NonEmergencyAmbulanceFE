import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { IRequestData } from '../../interface/irequest';
import { ITripData } from '../../interface/itrip-data';

@Injectable({
  providedIn: 'root'
})
export class NurseService {
  _httpClient = inject(HttpClient);

  GetUnassignedRequestsForNurse(): Observable<IRequestData[]> {
    return this._httpClient.get<IRequestData[]>(Environment.apiUrl + '/Request/available-for-nurse');
  }

  assignNurseToRequest(requestId: number, nurseId: number): Observable<any> {
    const body = { requestId, nurseId };
    return this._httpClient.put(Environment.apiUrl + '/Request/assign-nurse', body);
  }

    getTripsById(nurseId: number): Observable<ITripData[]> {
    return this._httpClient.get<ITripData[]>(Environment.apiUrl +`/trip/nurse/${nurseId}`);
  }

  }

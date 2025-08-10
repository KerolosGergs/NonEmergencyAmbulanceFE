import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { IRequestData } from '../../interface/irequest';
import { ITripData } from '../../interface/itrip-data';

@Injectable({
  providedIn: 'root'
})
export class NurseService {
  _httpClient = inject(HttpClient);

<<<<<<< Updated upstream
  GetUnassignedRequestsForNurse(): Observable<IRequestData[]> {
    return this._httpClient.get<IRequestData[]>(Environment.apiUrl + '/Request/available-for-nurse');
  }

  assignNurseToRequest(requestId: number, nurseId: number): Observable<any> {
    const body = { requestId, nurseId };
    return this._httpClient.put(Environment.apiUrl + '/Request/assign-nurse', body);
  }

    getTripsById(nurseId: number): Observable<ITripData[]> {
    return this._httpClient.get<ITripData[]>(Environment.apiUrl +`/trip/nurse/${nurseId}`);
=======
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
    return this._httpClient.get<GenerialResponse<INurse>>(this.api + '/' + id).pipe(
      map((response: GenerialResponse<INurse>) => {

        if (response.data.imgUrl == null)
          response.data.imgUrl = `assets/Patient_logo.png`
        else
          response.data.imgUrl = `${Environment.ImgUrl}${response.data.imgUrl}`


        return response;
      })
    );
  }

  updateNurse(id: number, value: INurse): Observable<GenerialResponse<INurse>> {
    return this._httpClient.patch<GenerialResponse<INurse>>(this.api + '/' + id, value);
>>>>>>> Stashed changes
  }

  }

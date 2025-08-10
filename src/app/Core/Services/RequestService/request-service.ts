import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< Updated upstream
import { Observable } from 'rxjs';
=======
import { map, Observable } from 'rxjs';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';
>>>>>>> Stashed changes

import { IRequestData } from '../../interface/irequest';
import { Environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private readonly http = inject(HttpClient);

  /** Get all requests */
<<<<<<< Updated upstream
  getRequests(): Observable<IRequestData[]> {
    return this.http.get<IRequestData[]>(`${Environment.apiUrl}/Request`);
=======
  getRequests(): Observable<GenerialResponse<IRequest[]>> {
    return this.http.get<GenerialResponse<IRequest[]>>(`${this.api}`).pipe(
      map((response: GenerialResponse<IRequest[]>) => {
           response.data.forEach((request: IRequest) => {
               request.patientImageUrl = `${Environment.ImgUrl}${request.patientImageUrl}`
               
             });
             return response;
           })
    );
  }

  /** Get pending requests for drivers */
  getAvailableRequestsForDrivers(): Observable<GenerialResponse<IRequest[]>> {
    return this.http.get<GenerialResponse<IRequest[]>>(`${this.api}/available-for-driver`).pipe(

         map((response: GenerialResponse<IRequest[]>) => {
           response.data.forEach((request: IRequest) => {
               request.patientImageUrl = `${Environment.ImgUrl}${request.patientImageUrl}`
               
             });
             return response;
           })
    );
  }

  /** Get pending requests for nurses */
  getAvailableRequestsForNurses(): Observable<GenerialResponse<IRequest[]>> {
    return this.http.get<GenerialResponse<IRequest[]>>(`${this.api}/available-for-nurse`).pipe(
     map((response: GenerialResponse<IRequest[]>) => {
           response.data.forEach((request: IRequest) => {
              if(request.patientImageUrl==null)
                  request.patientImageUrl = `assets/Patient_logo.png`
                else
               request.patientImageUrl = `${Environment.ImgUrl}${request.patientImageUrl}`

               
             });
             return response;
           })
    );
  }

  /** Create a new request */
  createRequest( dto: CreateRequest): Observable<GenerialResponse<any>> {
    debugger
    return this.http.post<GenerialResponse<any>>(`${this.api}?userId=${this.AuthService.getUserId()}`, dto);
  }

  /** Get request by ID */
  getRequestById(id: number): Observable<GenerialResponse<IRequest>> {
    return this.http.get<GenerialResponse<IRequest>>(`${this.api}/${id}`);
  }

  /** Update request */
  updateRequest(id: number, dto: IUpdateRequest): Observable<GenerialResponse<any>> {
    return this.http.put<GenerialResponse<any>>(`${this.api}/${id}`, dto);
  }

  /** Assign Driver */
  assignDriver( dto: IAssignDriver): Observable<GenerialResponse<any>> {
    return this.http.put<GenerialResponse<any>>(`${this.api}/assign-driver`, dto);
  }

  /** Assign Nurse */
  assignNurse(dto: IAssignNurse): Observable<GenerialResponse<any>> {
    return this.http.put<GenerialResponse<any>>(`${this.api}/assign-nurse`, dto);
  }

  /** Update request status */
  updateStatus(dto: UpdateRequestStatus): Observable<GenerialResponse<any>> {
    return this.http.put<GenerialResponse<any>>(`${this.api}/update-status`, dto);
  }

  /** Cancel a request */
  cancelRequest(id: number): Observable<GenerialResponse<any>> {
    return this.http.put<GenerialResponse<any>>(`${this.api}/cancel/${id}`, {});
  }

  /** Confirm request by patient */
  confirmRequestByPatient(requestId: number): Observable<GenerialResponse<any>> {
    return this.http.post<GenerialResponse<any>>(`${this.api}/confirm-request/${requestId}`, {});
  }

  /** Calculate Distance */
  getDistance(from: string, to: string): Observable<GenerialResponse<{ distance: number; }>> {
    return this.http.get<GenerialResponse<any>>(`${this.api}/distance?from=${from}&to=${to}`);
>>>>>>> Stashed changes
  }

   /** Get requests assigned to a given nurse */
  getRequestsByNurse(nurseId: number): Observable<IRequest[]> {
  return this.getRequests().pipe(
    map(res => {
      if (res.success && Array.isArray(res.data)) {
        return res.data
          .filter(r => r.nurseId === nurseId)
          .map(r => ({
            ...r,
            price: Math.floor(+r.price * 0.30) // 30% and floor
          }));
      }
      return [];
    })
  );
}

  /** Get requests assigned to a given driver */
  getRequestsByDriver(driverId: number): Observable<IRequest[]> {
    return this.getRequests().pipe(
      map(res => (res.success && Array.isArray(res.data)) ? res.data.filter(r => r.driverId === driverId) : [])
    );
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';

import { Environment } from '../../../../environments/environment';
import { CreateRequest, IAssignDriver, IAssignNurse, IRequest, IUpdateRequest, UpdateRequestStatus } from '../../interface/Request/irequest';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
 private http = inject(HttpClient);
  private api = Environment.apiUrl + '/Request';

  /** Get all requests */
  getRequests(): Observable<GenerialResponse<IRequest[]>> {
    return this.http.get<GenerialResponse<IRequest[]>>(`${this.api}`);
  }

  /** Get pending requests for drivers */
  getAvailableRequestsForDrivers(): Observable<GenerialResponse<IRequest[]>> {
    return this.http.get<GenerialResponse<IRequest[]>>(`${this.api}/available-for-driver`);
  }

  /** Get pending requests for nurses */
  getAvailableRequestsForNurses(): Observable<GenerialResponse<IRequest[]>> {
    return this.http.get<GenerialResponse<IRequest[]>>(`${this.api}/available-for-nurse`);
  }

  /** Create a new request */
  createRequest(userId: string, dto: CreateRequest): Observable<GenerialResponse<any>> {
    return this.http.post<GenerialResponse<any>>(`${this.api}?userId=${userId}`, dto);
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
  getDistance(from: string, to: string): Observable<GenerialResponse<any>> {
    return this.http.get<GenerialResponse<any>>(`${this.api}/distance?from=${from}&to=${to}`);
  }
}

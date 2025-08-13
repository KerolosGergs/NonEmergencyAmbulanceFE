import { AuthService } from './../AuthServices/auth-service';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';

import { Environment } from '../../../../environments/environment';
import { CreateRequest, IAssignDriver, IAssignNurse, IRequest, IUpdateRequest, UpdateRequestStatus } from '../../interface/Request/irequest';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private http = inject(HttpClient);
  private api = Environment.apiUrl + '/Request';
  AuthService = inject(AuthService);

  /** Get all requests */
  getRequests(): Observable<GenerialResponse<IRequest[]>> {
    return this.http.get<GenerialResponse<IRequest[]>>(`${this.api}`).pipe(
      map((res) => {
        res.data.forEach((request) => {
          if (request.patientImageUrl == null) {
            request.patientImageUrl = 'assets/Patient_logo.png'
          } else {
            request.patientImageUrl = `${Environment.ImgUrl}${request.patientImageUrl}`

          }
        })
        return res;
      })
    );
  };


  /** Get pending requests for drivers */
  getAvailableRequestsForDrivers(): Observable<GenerialResponse<IRequest[]>> {
    return this.http.get<GenerialResponse<IRequest[]>>(`${this.api}/available-for-driver`);
  }

  /** Get pending requests for nurses */
  getAvailableRequestsForNurses(): Observable<GenerialResponse<IRequest[]>> {
    return this.http.get<GenerialResponse<IRequest[]>>(`${this.api}/available-for-nurse`).pipe(
      map((res) => {
        res.data.forEach((request) => {
          if (request.patientImageUrl == null) {
            request.patientImageUrl = 'assets/Patient_logo.png'
          } else {
            request.patientImageUrl = `${Environment.ImgUrl}${request.patientImageUrl}`

          }
        })
        return res;
      })
    );
  }

  /** Create a new request */
  createRequest(dto: CreateRequest): Observable<GenerialResponse<any>> {
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
  assignDriver(dto: IAssignDriver): Observable<GenerialResponse<any>> {
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
  }

  getAssignedRequestsByNurse(nurseId: number): Observable<IRequest[]> {
    return this.getRequests().pipe(
      map((res) => {
        const list = (res?.success && Array.isArray(res.data)) ? res.data : [];
        return list
          .filter(r => r.nurseId === nurseId)
          .map(r => {
            const base = Number(r.price ?? 0);   // <-- force number
            return {
              ...r,
              price: Math.floor(base * 0.30)     // 30% share, floored
            };
          })
      })
    );
  }
    getAssignedRequestsByDriver(DriverId: number): Observable<IRequest[]> {
    return this.getRequests().pipe(
      map((res) => {
        const list = (res?.success && Array.isArray(res.data)) ? res.data : [];
        return list
          .filter(r => r.driverId === DriverId)
          .map(r => {
            const base = Number(r.price ?? 0);   // <-- force number
            return {
              ...r,
              price: Math.floor(base * 0.30)     // 30% share, floored
            };
          })
      })
    );
  }
}

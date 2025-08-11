import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';
import { map, Observable } from 'rxjs';
import { IPatient, PatientRequest, RequestStatus } from '../../interface/Patient/ipatient';
import { AuthService } from '../AuthServices/auth-service';
import { ITrip } from '../../interface/Trip/itrip';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  
  api = Environment.apiUrl + '/Patient'
  AuthService = inject(AuthService)
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
  getPatientRequests(id:number): Observable<GenerialResponse<PatientRequest[]>> {
    return this._.get<GenerialResponse<PatientRequest[]>>(this.api + `/${id}`+'/requests').pipe(
      map((response: GenerialResponse<PatientRequest[]>) => {
      response.data.forEach((request: PatientRequest) => {
          request.nurseImg = `${Environment.ImgUrl}${request.nurseImg}`
          request.driverImg = `${Environment.ImgUrl}${request.driverImg}`
          request.patientImageUrl = `${Environment.ImgUrl}${request.patientImageUrl}`
          request.price=Math.floor(Number(request.price));
          
        });
        return response;
      })
    );
  }
  getPatientTrips(id:number): Observable<GenerialResponse<ITrip[]>> {
    return this._.get<GenerialResponse<ITrip[]>>(this.api +`/${id}`+ '/trips').pipe(
      map((response: GenerialResponse<ITrip[]>) => {
      response.data.forEach((trip: ITrip) => {
        trip.price =   Math.floor(Number(trip.price));
        trip.distanceKM= Math.floor(Number(trip.distanceKM));
        });
        return response;
      })
    );
  }

    getStatusText(status: RequestStatus): string {
    switch (status) {
      case RequestStatus.Pending:
        return 'Pending';
      case RequestStatus.Accepted:
        return 'Confirmed';
      case RequestStatus.Cancelled:
        return 'Cancelled';
      case RequestStatus.InProgress:
        return 'In Progress';
      case RequestStatus.Completed:
        return 'Completed';
      default:
        return 'Unknown';
    }
  }

  getStatusClass(status: RequestStatus): string {
    switch (status) {
      case RequestStatus.Pending:
        return 'badge-warning';
      case RequestStatus.Accepted:
        return 'badge-success';
      case RequestStatus.Cancelled:
        return 'badge-danger';
      case RequestStatus.InProgress:
        return 'badge-info';
      case RequestStatus.Completed:
        return 'badge-primary';
      default:
        return 'badge-secondary';
    }
  }
}

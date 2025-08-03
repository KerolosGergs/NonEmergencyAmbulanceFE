import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';
import { AmbulanceDto, IAmbulance } from '../../interface/Ambulance/iambulance';

@Injectable({
  providedIn: 'root'
})
export class AmbulanceService {
 
  _ = inject(HttpClient);
  apiUrl = Environment.apiUrl + '/Ambulance';
  getAllAmbulances(): Observable<GenerialResponse<IAmbulance[]>> {
    return this._.get<GenerialResponse<IAmbulance[]>>(`${this.apiUrl}`);
  }

  getAmbulanceById(id: number): Observable<GenerialResponse<IAmbulance>> {
    return this._.get<GenerialResponse<IAmbulance>>(`${this.apiUrl}/${id}`);
  }

  createAmbulance(dto: AmbulanceDto): Observable<GenerialResponse<any>> {
    return this._.post<GenerialResponse<any>>(`${this.apiUrl}`, dto);
  }

  updateAmbulance(id: number, dto: AmbulanceDto): Observable<GenerialResponse<any>> {
    return this._.put<GenerialResponse<any>>(`${this.apiUrl}/${id}`, dto);
  }

  deleteAmbulance(id: number): Observable<GenerialResponse<null>> {
    return this._.delete<GenerialResponse<null>>(`${this.apiUrl}/${id}`);
  }

  assignDriver(ambulanceId: number, driverId: number): Observable<GenerialResponse<null>> {
    return this._.post<GenerialResponse<null>>(`${this.apiUrl}/assign-driver?ambulanceId=${ambulanceId}&driverId=${driverId}`, null);
  }
}

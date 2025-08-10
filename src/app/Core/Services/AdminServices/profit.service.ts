import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../../../../environments/environment';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';
import { ProfitDistributionDTO, UserBalanceDTO } from '../../interface/Admin/profit';

@Injectable({ providedIn: 'root' })
export class ProfitService {
  private apiUrl = Environment.apiUrl;
  constructor(private http: HttpClient) {}

  // Admin
  distributeTripProfits(tripId: number): Observable<GenerialResponse<any>> {
    return this.http.post<GenerialResponse<any>>(`${this.apiUrl}/profit/distribute/${tripId}`, {});
  }
  getAllProfitDistributions(): Observable<GenerialResponse<ProfitDistributionDTO[]>> {
    return this.http.get<GenerialResponse<ProfitDistributionDTO[]>>(`${this.apiUrl}/profit/all`);
  }
  getProfitDistributionByTrip(tripId: number): Observable<GenerialResponse<ProfitDistributionDTO>> {
    return this.http.get<GenerialResponse<ProfitDistributionDTO>>(`${this.apiUrl}/profit/trip/${tripId}`);
  }

  // User
  getUserBalance(): Observable<GenerialResponse<UserBalanceDTO>> {
    return this.http.get<GenerialResponse<UserBalanceDTO>>(`${this.apiUrl}/profit/balance`);
  }
  getUserProfitHistory(): Observable<GenerialResponse<ProfitDistributionDTO[]>> {
    return this.http.get<GenerialResponse<ProfitDistributionDTO[]>>(`${this.apiUrl}/profit/history`);
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../../../../environments/environment';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';
import { IProfitDistribution, IUserBalance, IProfitHistory, CreateWithdrawalRequestDTO } from '../../interface/Admin/profit';

@Injectable({
  providedIn: 'root'
})
export class ProfitService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${Environment.apiUrl}/profit`;

  // Distribute trip profits (Admin only)
  distributeTripProfits(tripId: number): Observable<GenerialResponse<any>> {
    return this.http.post<GenerialResponse<any>>(`${this.apiUrl}/distribute/${tripId}`, {});
  }

  // Get user balance
  getUserBalance(): Observable<GenerialResponse<IUserBalance>> {
    return this.http.get<GenerialResponse<IUserBalance>>(`${this.apiUrl}/balance`);
  }

  // Get user profit history
  getUserProfitHistory(): Observable<GenerialResponse<IProfitHistory[]>> {
    return this.http.get<GenerialResponse<IProfitHistory[]>>(`${this.apiUrl}/history`);
  }

  // Get all profit distributions (Admin only)
  getAllProfitDistributions(): Observable<GenerialResponse<IProfitDistribution[]>> {
    return this.http.get<GenerialResponse<IProfitDistribution[]>>(`${this.apiUrl}/all`);
  }

  // Get profit distribution by trip (Admin only)
  getProfitDistributionByTrip(tripId: number): Observable<GenerialResponse<IProfitDistribution>> {
    return this.http.get<GenerialResponse<IProfitDistribution>>(`${this.apiUrl}/trip/${tripId}`);
  }

  // Create withdrawal request
  createWithdrawalRequest(request: CreateWithdrawalRequestDTO): Observable<GenerialResponse<any>> {
    return this.http.post<GenerialResponse<any>>(`${this.apiUrl}/withdrawal/request`, request);
  }

  // Get user withdrawal requests
  getUserWithdrawalRequests(): Observable<GenerialResponse<any[]>> {
    return this.http.get<GenerialResponse<any[]>>(`${this.apiUrl}/withdrawal/requests`);
  }

  // Cancel withdrawal request
  cancelWithdrawalRequest(requestId: number): Observable<GenerialResponse<any>> {
    return this.http.delete<GenerialResponse<any>>(`${this.apiUrl}/withdrawal/request/${requestId}`);
  }
}

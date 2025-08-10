import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';
import { IWithdrawalRequest, WithdrawalSummaryDTO } from '../../interface/Admin/iwithdrawal';
import { Environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {
  private apiUrl = Environment.apiUrl;

  constructor(private http: HttpClient) { }

  getWithdrawalSummary(): Observable<GenerialResponse<WithdrawalSummaryDTO>> {
    return this.http.get<GenerialResponse<WithdrawalSummaryDTO>>(`${this.apiUrl}/withdrawal/summary`);
  }

  // Admin endpoints
  getAllWithdrawalRequests(): Observable<GenerialResponse<IWithdrawalRequest[]>> {
    return this.http.get<GenerialResponse<IWithdrawalRequest[]>>(`${this.apiUrl}/withdrawal/all`);
  }

  getPendingWithdrawalRequests(): Observable<GenerialResponse<IWithdrawalRequest[]>> {
    return this.http.get<GenerialResponse<IWithdrawalRequest[]>>(`${this.apiUrl}/withdrawal/pending`);
  }

  getWithdrawalRequest(requestId: number): Observable<GenerialResponse<IWithdrawalRequest>> {
    return this.http.get<GenerialResponse<IWithdrawalRequest>>(`${this.apiUrl}/withdrawal/${requestId}`);
  }

  approveWithdrawalRequest(requestId: number, notes?: string): Observable<GenerialResponse<IWithdrawalRequest>> {
    return this.http.post<GenerialResponse<IWithdrawalRequest>>(`${this.apiUrl}/withdrawal/approve/${requestId}`, notes ?? '');
  }

  rejectWithdrawalRequest(requestId: number, notes?: string): Observable<GenerialResponse<IWithdrawalRequest>> {
    return this.http.post<GenerialResponse<IWithdrawalRequest>>(`${this.apiUrl}/withdrawal/reject/${requestId}`, notes ?? '');
  }

  completeWithdrawalRequest(requestId: number): Observable<GenerialResponse<IWithdrawalRequest>> {
    return this.http.post<GenerialResponse<IWithdrawalRequest>>(`${this.apiUrl}/withdrawal/complete/${requestId}`, {});
  }

  // User endpoints
  createWithdrawalRequest(amount: number): Observable<GenerialResponse<IWithdrawalRequest>> {
    return this.http.post<GenerialResponse<IWithdrawalRequest>>(`${this.apiUrl}/profit/withdrawal/request`, { amount });
  }

  getUserWithdrawalRequests(): Observable<GenerialResponse<IWithdrawalRequest[]>> {
    return this.http.get<GenerialResponse<IWithdrawalRequest[]>>(`${this.apiUrl}/profit/withdrawal/requests`);
  }

  cancelWithdrawalRequest(requestId: number): Observable<GenerialResponse<any>> {
    return this.http.delete<GenerialResponse<any>>(`${this.apiUrl}/profit/withdrawal/request/${requestId}`);
  }
}

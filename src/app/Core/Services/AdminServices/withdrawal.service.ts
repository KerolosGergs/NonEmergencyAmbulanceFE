import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';
import { IWithdrawalRequest, CreateWithdrawalRequestDTO, WithdrawalSummaryDTO } from '../../interface/Admin/withdrawal';
import { Environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${Environment.apiUrl}/withdrawal`;

  // Get all withdrawal requests (Admin only)
  getAllWithdrawalRequests(): Observable<GenerialResponse<IWithdrawalRequest[]>> {
    return this.http.get<GenerialResponse<IWithdrawalRequest[]>>(`${this.apiUrl}/all`);
  }

  // Get pending withdrawal requests (Admin only)
  getPendingWithdrawalRequests(): Observable<GenerialResponse<IWithdrawalRequest[]>> {
    return this.http.get<GenerialResponse<IWithdrawalRequest[]>>(`${this.apiUrl}/pending`);
  }

  // Get specific withdrawal request
  getWithdrawalRequest(requestId: number): Observable<GenerialResponse<IWithdrawalRequest>> {
    return this.http.get<GenerialResponse<IWithdrawalRequest>>(`${this.apiUrl}/${requestId}`);
  }

  // Approve withdrawal request (Admin only)
  approveWithdrawalRequest(requestId: number, notes?: string): Observable<GenerialResponse<IWithdrawalRequest>> {
    return this.http.post<GenerialResponse<IWithdrawalRequest>>(`${this.apiUrl}/approve/${requestId}`, { notes });
  }

  // Reject withdrawal request (Admin only)
  rejectWithdrawalRequest(requestId: number, notes?: string): Observable<GenerialResponse<IWithdrawalRequest>> {
    return this.http.post<GenerialResponse<IWithdrawalRequest>>(`${this.apiUrl}/reject/${requestId}`, { notes });
  }

  // Complete withdrawal request (Admin only)
  completeWithdrawalRequest(requestId: number): Observable<GenerialResponse<IWithdrawalRequest>> {
    return this.http.post<GenerialResponse<IWithdrawalRequest>>(`${this.apiUrl}/complete/${requestId}`, {});
  }

  // Get withdrawal summary (Admin only)
  getWithdrawalSummary(): Observable<GenerialResponse<WithdrawalSummaryDTO>> {
    return this.http.get<GenerialResponse<WithdrawalSummaryDTO>>(`${this.apiUrl}/summary`);
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';
import { IWithdrawalRequest, WithdrawalSummaryDTO } from '../../interface/Admin/iwithdrawal';
import { Environment } from '../../../../environments/environment';
import { AuthService } from '../AuthServices/auth-service';
export interface WithdrawalRequest {
  userId: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {
  private apiUrl = Environment.apiUrl;
  private auth = inject(AuthService);
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

  approveWithdrawalRequest(requestId: number,adminId:String, notes?: string): Observable<GenerialResponse<IWithdrawalRequest>> {
    return this.http.post<GenerialResponse<IWithdrawalRequest>>(`${this.apiUrl}/withdrawal/approve/${requestId}/${adminId}`, notes ?? '');
  }

  rejectWithdrawalRequest(requestId: number,adminId:String, notes?: string): Observable<GenerialResponse<IWithdrawalRequest>> {
    return this.http.post<GenerialResponse<IWithdrawalRequest>>(`${this.apiUrl}/withdrawal/reject/${requestId}/${adminId}`, notes ?? '');
  }

  completeWithdrawalRequest(requestId: number,adminId:String): Observable<GenerialResponse<IWithdrawalRequest>> {
    return this.http.post<GenerialResponse<IWithdrawalRequest>>(`${this.apiUrl}/withdrawal/complete/${requestId}/${adminId}`, {});
  }

  // User endpoints
  createWithdrawalRequest(amount: number): Observable<GenerialResponse<IWithdrawalRequest>> {
    return this.http.post<GenerialResponse<IWithdrawalRequest>>(`${this.apiUrl}/profit/withdrawal/request/${this.auth.getUserId()}`, {
  "userId": this.auth.getUserId(),
  "amount": amount
});
  }

  getUserWithdrawalRequests(): Observable<GenerialResponse<IWithdrawalRequest[]>> {
    return this.http.get<GenerialResponse<IWithdrawalRequest[]>>(`${this.apiUrl}/profit/withdrawal/requests`);
  }

  cancelWithdrawalRequest(requestId: number): Observable<GenerialResponse<any>> {
    return this.http.delete<GenerialResponse<any>>(`${this.apiUrl}/profit/withdrawal/request/${requestId}`);
  }
}

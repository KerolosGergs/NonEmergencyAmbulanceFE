import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenerialResponse } from '../../interface/GenerialResponse/GenerialResponse';
import { WithdrawalSummaryDTO } from '../../interface/Admin/iwithdrawal';
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
}

import { NurseService } from '../../../../Core/Services/NurseServise/nurse-service';
import { RequestService } from './../../../../Core/Services/RequestService/request-service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WithdrawalService } from '../../../../Core/Services/AdminServices/withdrawal-service';
import { ProfitService } from '../../../../Core/Services/AdminServices/profit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-n-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './n-header.html',
  styleUrl: './n-header.scss'
})
export class NHeader implements OnInit {
  title = 'Nurse Dashboard';
  date = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  newRequests!: number;
  totalMoney = 0;
  withdrawAmount = 0;

  _requestService = inject(RequestService);
  _withdrawalService = inject(WithdrawalService);
  _profitService = inject(ProfitService);
  _router = inject(Router);

  ngOnInit(): void {
    this.getRequestCount();
  }

  getRequestCount() {
    this._requestService.getAvailableRequestsForNurses().subscribe({
      next: (data) => {
        if(data.success){
          this.newRequests = data.data.length;
        }
        console.log('Fetched requests:', data);},
      error: (err) => {
        console.error('Error fetching request count:', err);
      }
    });
  }

  ngAfterViewInit(): void {
    this.getTotalMoney();
  }

  getTotalMoney() {
    this._profitService.getUserBalance().subscribe({
      next: (resp) => {
        if (resp.success && resp.data) {
          this.totalMoney = resp.data.currentBalance;
        } else {
          this.totalMoney = 0;
        }
      },
      error: () => this.totalMoney = 0
    });
  }

  confirmWithdraw() {
    if (this.withdrawAmount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    if (this.withdrawAmount > this.totalMoney) {
      alert('You cannot withdraw more than your total money.');
      return;
    }
    this._withdrawalService.createWithdrawalRequest(this.withdrawAmount).subscribe({
      next: (resp) => {
        if (resp.success) {
          alert(`Withdrawal request submitted for $${this.withdrawAmount.toFixed(2)}`);
          this.withdrawAmount = 0;
        } else {
          alert(resp.message || 'Failed to submit withdrawal request');
        }
      },
      error: () => alert('Error submitting withdrawal request')
    });
  }
}

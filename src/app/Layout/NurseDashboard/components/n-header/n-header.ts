import { NurseService } from '../../../../Core/Services/NurseServise/nurse-service';
import { RequestService } from './../../../../Core/Services/RequestService/request-service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WithdrawalService } from '../../../../Core/Services/AdminServices/withdrawal-service';
import { ProfitService } from '../../../../Core/Services/AdminServices/profit.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Core/Services/AuthServices/auth-service';

@Component({
  selector: 'app-n-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './n-header.html',
  styleUrl: './n-header.scss'
})
export class NHeader implements OnInit {
fullName: string | null = null;
  certification: string | null = null;
  phoneNumber: string | null = null;
  imgUrl: string | null = null;

  today = new Date();
  totalMoney = 0;
  withdrawAmount = 0;
  loading = true;

  // private readonly _requestService = inject(RequestService);
  private readonly _withdrawalService = inject(WithdrawalService);
  private readonly _profitService = inject(ProfitService);
  private readonly _nurseService = inject(NurseService);
  private readonly _auth = inject(AuthService);
  private readonly _router = inject(Router);

  ngOnInit(): void {
    this.loadProfile();
    this.getTotalMoney();
  }

  private loadProfile(): void {
    this._nurseService.getById(this._auth.getProfileId()!).subscribe({
      next: (res) => {
        if (res?.success && res.data) {
          // const d = res.data as { fullName?: string; certification?: string; phoneNumber?: string; imgUrl?: string };
          this.fullName = res.data.fullName ?? this._auth.getFullName();
          this.certification = res.data.certification ?? null;
          this.phoneNumber = res.data.phoneNumber ?? null;
          this.imgUrl = res.data.imgUrl ?? null;
        } else {
          this.fullName = this._auth.getFullName();
        }
        this.loading = false;
      },
      error: () => {
        this.fullName = this._auth.getFullName();
        this.loading = false;
      }
    });
  }



  private getTotalMoney(): void {
    this._profitService.getUserBalance().subscribe({
      next: (res) => { this.totalMoney = (res?.success && res.data?.currentBalance) ? res.data.currentBalance : 0; },
      error: () => (this.totalMoney = 0)
    });
  }

  withdraw(): void {
    if (this.withdrawAmount <= 0) return alert('Please enter a valid amount.');
    if (this.withdrawAmount > this.totalMoney) return alert('You cannot withdraw more than your total balance.');
    this._withdrawalService.createWithdrawalRequest(this.withdrawAmount).subscribe({
      next: (res) => {
        if (res?.success) {
          alert(`تم إرسال طلب سحب بقيمة ${this.withdrawAmount.toFixed(2)} EGP`);
          this.withdrawAmount = 0;
          this.getTotalMoney();
        } else alert(res?.message || 'Failed to submit withdrawal request');
      },
      error: () => alert('Error submitting withdrawal request')
    });
  }

  logout(): void {
    this._auth.logout();
    this._router.navigate(['/login']);
  }
}
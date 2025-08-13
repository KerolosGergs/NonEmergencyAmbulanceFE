import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { NurseService } from '../../../../Core/Services/NurseServise/nurse-service';
import { WithdrawalService } from '../../../../Core/Services/AdminServices/withdrawal-service';
import { ProfitService } from '../../../../Core/Services/AdminServices/profit.service';
import { AuthService } from '../../../../Core/Services/AuthServices/auth-service';
// Optional: enable ng-bootstrap in this component if you need it later
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-n-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // NgbModule, // uncomment if you use ng-bootstrap components here
  ],
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
  loading = true;

  withdrawForm!: FormGroup;

  private readonly _withdrawalService = inject(WithdrawalService);
  private readonly _profitService = inject(ProfitService);
  private readonly _nurseService = inject(NurseService);
  private readonly _auth = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this.buildForm();
    this.loadProfile();
    this.getTotalMoney();
  }

  private buildForm(): void {
    this.withdrawForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  private loadProfile(): void {
    const id = this._auth.getProfileId();
    if (!id) { this.loading = false; return; }

    this._nurseService.getById(id).subscribe({
      next: (res) => {
        if (res?.success && res.data) {
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
      next: (res) => {
        this.totalMoney = (res?.success && typeof res.data === 'number') ? res.data : 0;

        // Set dynamic max validator after we know the balance
        const ctrl = this.withdrawForm.get('amount');
        if (ctrl) {
          ctrl.addValidators(Validators.max(this.totalMoney || 0));
          ctrl.updateValueAndValidity({ emitEvent: false });
        }
      },
      error: () => (this.totalMoney = 0)
    });
  }

  withdraw(): void {
    if (this.loading) return;

    const ctrl = this.withdrawForm.get('amount');
    const value = Number(ctrl?.value || 0);

    if (!ctrl || this.withdrawForm.invalid) {
      this.toastr.error('Please enter a valid amount.', 'Invalid Amount');
      return;
    }
    if (value > this.totalMoney) {
      this.toastr.info('You cannot withdraw more than your current balance.', 'Notice');
      return;
    }

    this.loading = true;
    this._withdrawalService.createWithdrawalRequest(value).subscribe({
      next: (res) => {
        if (res?.success) {
          this.toastr.success(`Withdrawal request of ${value.toFixed(2)} EGP submitted successfully.`, 'Success');
          this.withdrawForm.reset();
          this.getTotalMoney();
        } else {
          this.toastr.error(res?.message || 'Failed to submit withdrawal request.', 'Error');
        }
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Error submitting withdrawal request.', 'Error');
        this.loading = false;
      }
    });
  }

  logout(): void {
    this._auth.logout();
    this._router.navigate(['/login']);
  }
}

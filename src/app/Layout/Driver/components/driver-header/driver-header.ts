import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-driver-header',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './driver-header.html',
  styleUrls: ['./driver-header.scss']
})
export class DriverHeader implements OnInit {
  // Services
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  /** Inputs (feed these from parent if you have real data) */
  @Input() driverName = 'John Miller';
  @Input() driverId = 'DRV-10293';
  @Input() phoneNumber?: string;
  @Input() certification?: string; // if you want a tag like “Class B”
  @Input() imgUrl?: string;
  @Input() totalMoney = 0;

  loading = signal(false);
  today = new Date();

  withdrawForm!: FormGroup;

  ngOnInit(): void {
    this.withdrawForm = this.fb.group({
      amount: [
        null,
        [
          Validators.required,
          Validators.min(50),      // set your minimum allowed withdrawal
          Validators.max(1000000)  // guard too-large input
        ]
      ]
    });
  }

  /** Submit withdraw */
  withdraw(): void {
    if (this.withdrawForm.invalid) {
      this.withdrawForm.markAllAsTouched();
      this.toastr.error('Please enter a valid amount.', 'Withdraw');
      return;
    }
    const amount = this.withdrawForm.value.amount;
    if (amount > this.totalMoney) {
      this.toastr.warning('Amount exceeds current balance.', 'Withdraw');
      return;
    }

    this.loading.set(true);
    // TODO: call your API here
    setTimeout(() => {
      this.loading.set(false);
      this.totalMoney -= amount;
      this.withdrawForm.reset();
      this.toastr.success('Withdrawal request submitted.', 'Withdraw');
    }, 600);
  }

  logout(): void {
    // TODO: plug your real logout
    this.toastr.info('You have logged out.', 'Session');
  }

  /** Shorthands for validation state */
  get amountCtrl() { return this.withdrawForm.get('amount'); }
}
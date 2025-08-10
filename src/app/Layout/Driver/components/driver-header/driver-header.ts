import { Component, OnInit, inject } from '@angular/core';
import { IDriver } from '../../../../Core/interface/Driver/IDriver';
import { DriverService } from '../../../../Core/Services/Driver/driver';
import { AuthService } from '../../../../Core/Services/AuthServices/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Environment } from '../../../../../environments/environment';
import { WithdrawalService } from '../../../../Core/Services/AdminServices/withdrawal-service';

@Component({
  selector: 'app-driver-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './driver-header.html',
  styleUrls: ['./driver-header.scss']
})
export class DriverHeader implements OnInit {
  // Services
  private readonly driverService = inject(DriverService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly withdrawalService = inject(WithdrawalService);

  // Driver data
  driverData!: IDriver;
  userName: string = '';
  userImage: string = '';
  date: string = '';
  totalMoney: number = 0;
  withdrawAmount: number = 0;

  ngOnInit(): void {
    this.loadDriver(4); // TODO: replace with current driver id from auth/profile
    this.getUserInfo();
    this.setCurrentDate();
    this.getTotalMoney();
  }

  private buildImageUrl(maybeRelative?: string): string {
    if (!maybeRelative) return 'assets/default-driver.png';
    if (maybeRelative.startsWith('http://') || maybeRelative.startsWith('https://')) {
      return maybeRelative;
    }
    return Environment.ImgUrl + maybeRelative;
  }

  getUserInfo() {
    this.userName = this.authService.getFullName() || 'Driver';
    // placeholder until driver image loads
    this.userImage = 'assets/default-driver.png';
  }

  setCurrentDate() {
    this.date = new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getTotalMoney() {
    this.totalMoney = 0; // replace with API call
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

    this.withdrawalService.createWithdrawalRequest(this.withdrawAmount).subscribe({
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

  /** Load driver by ID */
  private loadDriver(driverId: number): void {
    this.driverService.getById(driverId).subscribe({
      next: (driver) => {
        if (driver.success) {
          this.driverData = driver.data;
          // Prefer explicit imgUrl, fallback to driverImg
          const apiImg = this.driverData.imgUrl || this.driverData.driverImg;
          this.userImage = this.buildImageUrl(apiImg);
          // Fallback name if not provided in Auth
          if (!this.userName) {
            this.userName = this.driverData.userFullName ?? 'Driver';
          }
        }
      },
      error: (error) => {
        console.error('Error fetching driver data:', error);
      }
    });
  }

  /** Convenience getters */
  get driverName(): string {
    return this.driverData?.userFullName ?? this.userName ?? 'Unknown Driver';
  }

  get driverId(): number | string {
    return this.driverData?.id ?? 'N/A';
  }
}

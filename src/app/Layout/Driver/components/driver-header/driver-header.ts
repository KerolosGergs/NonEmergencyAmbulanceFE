import { Component, OnInit, inject } from '@angular/core';
import { IDriver } from '../../../../Core/interface/Driver/IDriver';
<<<<<<< Updated upstream
import { Driver } from '../../../../Core/Services/Driver/driver';
=======
import { DriverService } from '../../../../Core/Services/Driver/driver';
import { AuthService } from '../../../../Core/Services/AuthServices/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
>>>>>>> Stashed changes

@Component({
  selector: 'app-driver-header',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './driver-header.html',
  styleUrls: ['./driver-header.scss']
})
export class DriverHeader implements OnInit {
  // Services
<<<<<<< Updated upstream
  private readonly driverService = inject(Driver);
=======
  private readonly driverService = inject(DriverService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
>>>>>>> Stashed changes

  // Driver data
  driverData!: IDriver;
  userName: string = '';
  userImage: string = '';
  date: string = '';
  totalMoney: number = 0;
  withdrawAmount: number = 0;

  ngOnInit(): void {
    this.loadDriver(2); // Replace 4 with dynamic ID if needed
    this.getUserInfo();
    this.setCurrentDate();
    this.getTotalMoney();
  }

  getUserInfo() {
    this.userName = this.authService.getFullName() || 'Driver';
    // You can set a default image or get from user profile
    this.userImage = 'assets/images/default-avatar.png';
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
    // TODO: Replace with actual API call to get driver's total earnings
    this.totalMoney = 0; // Placeholder - implement actual API call
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

    // TODO: Implement actual withdrawal API call
    this.totalMoney -= this.withdrawAmount;
    alert(`Successfully withdrawn $${this.withdrawAmount.toFixed(2)}`);
    this.withdrawAmount = 0;
  }

  /** Load driver by ID */
  private loadDriver(driverId: number): void {
    this.driverService.getdriverById(driverId).subscribe({
      next: (driver) => {
<<<<<<< Updated upstream
        this.driverData = driver;
=======
        if (driver.success) {
          this.driverData = driver.data;
        }
>>>>>>> Stashed changes
      },
      error: (error) => {
        console.error('Error fetching driver data:', error);
      }
    });
  }

  /** Get driver's full name */
  get driverName(): string {
    return this.driverData?.userFullName ?? 'Unknown Driver';
  }

  /** Get driver's ID */
  get driverId(): number | string {
    return this.driverData?.id ?? 'N/A';
  }
}

import { error } from 'console';
import { INurse } from '../../../../Core/interface/Nurse/inurse';
import { NurseService } from '../../../../Core/Services/NurseServise/nurse-service';
import { RequestService } from './../../../../Core/Services/RequestService/request-service';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../Core/Services/AuthServices/auth-service';
import { DecimalPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-n-header',
  standalone: true,
  imports: [FormsModule, DecimalPipe, CommonModule],
  templateUrl: './n-header.html',
  styleUrl: './n-header.scss'
})
export class NHeader implements OnInit {
  title = 'Nurse Dashboard';
  date = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

<<<<<<< Updated upstream
  _nurseService = inject(NurseService);
=======
  NurseData!: INurse;
  newRequests = 0;
  totalMoney = 0;
  withdrawAmount = 0;
  userName: string = '';
  userImage: string = '';

  _requestService = inject(RequestService);
  _nurseService = inject(NurseService);
  _authService = inject(AuthService);
  _router = inject(Router);
>>>>>>> Stashed changes

  ngOnInit(): void {
    this.getNurseData();
    this.getTotalMoney();
    this.getUserInfo();
  }

<<<<<<< Updated upstream
  getRequestCount() {
    this._nurseService.GetUnassignedRequestsForNurse().subscribe({
      next: (data) => {
        this.newRequests = data.length;
      },
      error: (err) => {
        console.error('Error fetching request count:', err);
      }
=======
  getUserInfo() {
    this.userName = this._authService.getFullName() || 'Nurse';
    // You can set a default image or get from user profile
    this.userImage = 'assets/images/default-avatar.png';
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

  getNurseData() {
    this._nurseService.getById(2).subscribe({
      next: (data) => {
        if (data.success) {
          this.NurseData = data.data;
        }
      },
      error: (err) => console.error('Error fetching nurse data:', err)
>>>>>>> Stashed changes
    });
  }

  getTotalMoney() {
    this.totalMoney = 0; // Replace with API call later
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

    this.totalMoney -= this.withdrawAmount;
    alert(`Successfully withdrawn $${this.withdrawAmount.toFixed(2)}`);
    this.withdrawAmount = 0;
  }
}
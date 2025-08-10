import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IUserBalance, IProfitHistory, CreateWithdrawalRequestDTO } from '../../../../../../Core/interface/Admin/profit';
import { ProfitService } from '../../../../../../Core/Services/AdminServices/profit.service';
import { GenerialResponse } from '../../../../../../Core/interface/GenerialResponse/GenerialResponse';
import { AuthService } from '../../../../../../Core/Services/AuthServices/auth-service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.scss']
})
export class UserDashboardComponent implements OnInit {
  userBalance: IUserBalance | null = null;
  profitHistory: IProfitHistory[] = [];
  loading = false;
  error = '';
  showWithdrawalModal = false;
  withdrawalRequest: CreateWithdrawalRequestDTO = {
    userId: '',
    amount: 0,
    bankAccount: '',
    bankName: '',
    notes: ''
  };

  private readonly profitService = inject(ProfitService);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.loading = true;
    this.error = '';

    // Load user balance
    this.profitService.getUserBalance().subscribe({
      next: (response: GenerialResponse<IUserBalance>) => {
        if (response.success && response.data) {
          this.userBalance = response.data;
          this.withdrawalRequest.userId = this.userBalance.userId;
        } else {
          this.error = response.message || 'Failed to load user balance';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading user balance';
        this.loading = false;
        console.error('Error loading user balance:', err);
      }
    });

    // Load profit history
    this.profitService.getUserProfitHistory().subscribe({
      next: (response: GenerialResponse<IProfitHistory[]>) => {
        if (response.success && response.data) {
          this.profitHistory = response.data;
        }
      },
      error: (err) => {
        console.error('Error loading profit history:', err);
      }
    });
  }

  openWithdrawalModal(): void {
    this.showWithdrawalModal = true;
  }

  closeWithdrawalModal(): void {
    this.showWithdrawalModal = false;
    this.resetWithdrawalForm();
  }

  resetWithdrawalForm(): void {
    this.withdrawalRequest = {
      userId: this.userBalance?.userId || '',
      amount: 0,
      bankAccount: '',
      bankName: '',
      notes: ''
    };
  }

  createWithdrawalRequest(): void {
    if (this.withdrawalRequest.amount <= 0) {
      this.error = 'Please enter a valid amount';
      return;
    }

    if (this.withdrawalRequest.amount > (this.userBalance?.availableAmount || 0)) {
      this.error = 'Amount cannot exceed available balance';
      return;
    }

    this.profitService.createWithdrawalRequest(this.withdrawalRequest).subscribe({
      next: (response: GenerialResponse<any>) => {
        if (response.success) {
          this.closeWithdrawalModal();
          this.loadUserData(); // Reload data
        } else {
          this.error = response.message || 'Failed to create withdrawal request';
        }
      },
      error: (err) => {
        this.error = 'Error creating withdrawal request';
        console.error('Error creating withdrawal request:', err);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'badge bg-warning';
      case 'Distributed': return 'badge bg-success';
      case 'Completed': return 'badge bg-info';
      case 'Cancelled': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }

  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }
}

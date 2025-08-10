import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IWithdrawalRequest, WithdrawalStatus } from '../../../../../../Core/interface/Admin/iwithdrawal';
import { WithdrawalService } from '../../../../../../Core/Services/AdminServices/withdrawal-service';
import { GenerialResponse } from '../../../../../../Core/interface/GenerialResponse/GenerialResponse';

@Component({
  selector: 'app-withdrawal-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './withdrawal-management.html',
  styleUrls: ['./withdrawal-management.scss']
})
export class WithdrawalManagementComponent implements OnInit {
  withdrawalRequests: IWithdrawalRequest[] = [];
  loading = false;
  error = '';
  selectedRequest: IWithdrawalRequest | null = null;
  notes = '';
  showActionModal = false;
  actionType: 'approve' | 'reject' | 'complete' = 'approve';

  private readonly withdrawalService = inject(WithdrawalService);

  ngOnInit(): void {
    this.loadWithdrawalRequests();
  }

  loadWithdrawalRequests(): void {
    this.loading = true;
    this.error = '';

    this.withdrawalService.getAllWithdrawalRequests().subscribe({
      next: (response: GenerialResponse<IWithdrawalRequest[]>) => {
        if (response.success && response.data) {
          this.withdrawalRequests = response.data;
        } else {
          this.error = response.message || 'Failed to load withdrawal requests';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading withdrawal requests';
        this.loading = false;
        console.error('Error loading withdrawal requests:', err);
      }
    });
  }

  openActionModal(request: IWithdrawalRequest, action: 'approve' | 'reject' | 'complete'): void {
    this.selectedRequest = request;
    this.actionType = action;
    this.notes = '';
    this.showActionModal = true;
  }

  closeActionModal(): void {
    this.showActionModal = false;
    this.selectedRequest = null;
    this.notes = '';
  }

  performAction(): void {
    if (!this.selectedRequest) return;

    const requestId = this.selectedRequest.id;
    let action$;

    switch (this.actionType) {
      case 'approve':
        action$ = this.withdrawalService.approveWithdrawalRequest(requestId, this.notes);
        break;
      case 'reject':
        action$ = this.withdrawalService.rejectWithdrawalRequest(requestId, this.notes);
        break;
      case 'complete':
        action$ = this.withdrawalService.completeWithdrawalRequest(requestId);
        break;
    }

    if (action$) {
      action$.subscribe({
        next: (response: GenerialResponse<IWithdrawalRequest>) => {
          if (response.success) {
            this.loadWithdrawalRequests();
            this.closeActionModal();
          } else {
            this.error = response.message || 'Action failed';
          }
        },
        error: (err) => {
          this.error = 'Error performing action';
          console.error('Error performing action:', err);
        }
      });
    }
  }

  getStatusClass(status: WithdrawalStatus): string {
    switch (status) {
      case WithdrawalStatus.Pending: return 'badge bg-warning';
      case WithdrawalStatus.Approved: return 'badge bg-success';
      case WithdrawalStatus.Rejected: return 'badge bg-danger';
      case WithdrawalStatus.Completed: return 'badge bg-info';
      default: return 'badge bg-secondary';
    }
  }
}

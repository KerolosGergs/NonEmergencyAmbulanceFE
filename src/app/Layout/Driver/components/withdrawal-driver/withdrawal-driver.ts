import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WithdrawalUserRequests, WithdrawalStatus } from '../../../../Core/interface/Admin/profit';
import { ProfitService } from '../../../../Core/Services/AdminServices/profit.service';
import { GenerialResponse } from '../../../../Core/interface/GenerialResponse/GenerialResponse';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';

type TabKey = 'all' | WithdrawalStatus;

@Component({
  selector: 'app-withdrawal-driver',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgClass],
  templateUrl: './withdrawal-driver.html',
  styleUrl: './withdrawal-driver.scss'
})
export class WithdrawalDriver implements OnInit {
  private readonly toastr = inject(ToastrService);
  private readonly profitService = inject(ProfitService); // UPDATED: lowerCamelCase

  requests: WithdrawalUserRequests[] = [];
  loading = false;
  error = '';

  readonly Status = WithdrawalStatus;

  // UPDATED: correct label for Completed, and strong typing
  readonly tabs: ReadonlyArray<{ key: TabKey; label: string }> = [
    { key: 'all',                    label: 'All' },
    { key: WithdrawalStatus.Pending, label: 'Pending' },
    { key: WithdrawalStatus.Approved,label: 'Approved' },
    { key: WithdrawalStatus.Rejected,label: 'Rejected' },
    { key: WithdrawalStatus.Completed,label: 'Completed' }
  ];

  activeTab: TabKey = 'all';

  ngOnInit(): void {
    this.loadRequests();
  }

  // API
  loadRequests(): void {
    this.loading = true;
    this.error = '';
    this.profitService.getUserRequests().subscribe({
      next: (res: GenerialResponse<WithdrawalUserRequests[]>) => {
        this.requests = res?.data ?? [];
        if (res?.success) {
          // this.toastr.success(res.message || 'Withdrawal requests loaded.', 'Success');
        } else {
          // this.toastr.warning(res?.message || 'Loaded with warnings.', 'Notice');
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load withdrawal requests.';
        // this.toastr.error(this.error, 'Error');
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Filtering / counts
  trackById = (_: number, r: WithdrawalUserRequests) => r.id; // UPDATED: use id, not $index

  count(tab: TabKey): number {
    return tab === 'all' ? this.requests.length : this.requests.filter(r => r.status === tab).length;
  }

  getFiltered(): WithdrawalUserRequests[] {
    return this.activeTab === 'all' ? this.requests : this.requests.filter(r => r.status === this.activeTab);
  }

  // Status helpers (texts, badges, icons)
  getStatusText(status: WithdrawalStatus): string {
    switch (status) {
      case WithdrawalStatus.Pending:   return 'Pending';
      case WithdrawalStatus.Approved:  return 'Approved';
      case WithdrawalStatus.Rejected:  return 'Rejected';
      case WithdrawalStatus.Completed: return 'Completed';
      default:                         return 'Unknown';
    }
  }

  // UPDATED: softer, consistent badge palette
  getStatusBadgeClass(status: WithdrawalStatus): string {
    switch (status) {
      case WithdrawalStatus.Pending:   return 'badge bg-warning-subtle text-warning-emphasis';
      case WithdrawalStatus.Approved:  return 'badge bg-success-subtle text-success-emphasis';
      case WithdrawalStatus.Rejected:  return 'badge bg-danger-subtle text-danger-emphasis';
      case WithdrawalStatus.Completed: return 'badge bg-primary-subtle text-primary-emphasis';
      default:                         return 'badge bg-light text-dark';
    }
  }

  // UPDATED: nicer BI icons per status
  getStatusIcon(status: WithdrawalStatus): string {
    switch (status) {
      case WithdrawalStatus.Pending:   return 'bi-hourglass-split';
      case WithdrawalStatus.Approved:  return 'bi-patch-check-fill';
      case WithdrawalStatus.Rejected:  return 'bi-x-octagon-fill';
      case WithdrawalStatus.Completed: return 'bi-check-all';
      default:                         return 'bi-question-circle';
    }
  }

  // To avoid inline .find() in template
  getActiveTabLabel(): string {
    const t = this.tabs.find(tab => tab.key === this.activeTab);
    return t ? t.label : '';
  }
}

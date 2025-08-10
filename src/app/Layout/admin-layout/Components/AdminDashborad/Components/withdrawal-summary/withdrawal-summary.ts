import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawalSummaryDTO } from '../../../../../../Core/interface/Admin/iwithdrawal';
import { WithdrawalService } from '../../../../../../Core/Services/AdminServices/withdrawal-service';
import { GenerialResponse } from '../../../../../../Core/interface/GenerialResponse/GenerialResponse';

@Component({
  selector: 'app-withdrawal-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './withdrawal-summary.html',
  styleUrls: ['./withdrawal-summary.scss']
})
export class WithdrawalSummaryComponent implements OnInit {
  summary: WithdrawalSummaryDTO | null = null;
  loading = false;
  error = '';

  private readonly withdrawalService = inject(WithdrawalService);

  ngOnInit(): void {
    this.loadWithdrawalSummary();
  }

  loadWithdrawalSummary(): void {
    this.loading = true;
    this.error = '';
    debugger
    this.withdrawalService.getWithdrawalSummary().subscribe({
        
      next: (response: GenerialResponse<WithdrawalSummaryDTO>) => {
        
        if (response.success && response.data) {
          this.summary = response.data;
        } else {
          this.error = response.message || 'Failed to load withdrawal summary';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading withdrawal summary';
        this.loading = false;
        console.error('Error loading withdrawal summary:', err);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'badge bg-warning';
      case 'approved':
        return 'badge bg-success';
      case 'rejected':
        return 'badge bg-danger';
      case 'completed':
        return 'badge bg-info';
      default:
        return 'badge bg-secondary';
    }
  }
}

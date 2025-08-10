import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawalService } from '../../../../../../Core/Services/AdminServices/withdrawal-service';
import { WithdrawalSummaryDTO } from '../../../../../../Core/interface/Admin/iwithdrawal';
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
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.withdrawalService.getWithdrawalSummary().subscribe({
      next: (res: GenerialResponse<WithdrawalSummaryDTO>) => {
        this.summary = res.success ? res.data : null;
        if (!res.success) this.error = res.message || 'Failed to load summary';
        this.loading = false;
      },
      error: () => {
        this.error = 'Error loading summary';
        this.loading = false;
      }
    });
  }
}

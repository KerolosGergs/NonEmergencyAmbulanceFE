import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IProfitDistribution, ProfitDistributionStatus } from '../../../../../../Core/interface/Admin/profit';
import { ProfitService } from '../../../../../../Core/Services/AdminServices/profit.service';
import { GenerialResponse } from '../../../../../../Core/interface/GenerialResponse/GenerialResponse';

@Component({
  selector: 'app-profit-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profit-management.html',
  styleUrls: ['./profit-management.scss']
})
export class ProfitManagementComponent implements OnInit {
  profitDistributions: IProfitDistribution[] = [];
  loading = false;
  error = '';
  selectedTripId: number | null = null;
  showDistributeModal = false;

  private readonly profitService = inject(ProfitService);

  ngOnInit(): void {
    this.loadProfitDistributions();
  }

  loadProfitDistributions(): void {
    this.loading = true;
    this.error = '';

    this.profitService.getAllProfitDistributions().subscribe({
      next: (response: GenerialResponse<IProfitDistribution[]>) => {
        if (response.success && response.data) {
          this.profitDistributions = response.data;
        } else {
          this.error = response.message || 'Failed to load profit distributions';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading profit distributions';
        this.loading = false;
        console.error('Error loading profit distributions:', err);
      }
    });
  }

  openDistributeModal(tripId: number): void {
    this.selectedTripId = tripId;
    this.showDistributeModal = true;
  }

  closeDistributeModal(): void {
    this.showDistributeModal = false;
    this.selectedTripId = null;
  }

  distributeProfits(): void {
    if (!this.selectedTripId) return;

    this.profitService.distributeTripProfits(this.selectedTripId).subscribe({
      next: (response: GenerialResponse<any>) => {
        if (response.success) {
          this.loadProfitDistributions(); // Reload the list
          this.closeDistributeModal();
        } else {
          this.error = response.message || 'Failed to distribute profits';
        }
      },
      error: (err) => {
        this.error = 'Error distributing profits';
        console.error('Error distributing profits:', err);
      }
    });
  }

  getStatusClass(status: ProfitDistributionStatus): string {
    switch (status) {
      case ProfitDistributionStatus.Pending: return 'badge bg-warning';
      case ProfitDistributionStatus.Distributed: return 'badge bg-success';
      case ProfitDistributionStatus.Completed: return 'badge bg-info';
      case ProfitDistributionStatus.Cancelled: return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }

  getStatusText(status: ProfitDistributionStatus): string {
    switch (status) {
      case ProfitDistributionStatus.Pending: return 'Pending';
      case ProfitDistributionStatus.Distributed: return 'Distributed';
      case ProfitDistributionStatus.Completed: return 'Completed';
      case ProfitDistributionStatus.Cancelled: return 'Cancelled';
      default: return 'Unknown';
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

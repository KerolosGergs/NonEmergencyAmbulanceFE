import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfitService } from '../../../../../../Core/Services/AdminServices/profit.service';
import { GenerialResponse } from '../../../../../../Core/interface/GenerialResponse/GenerialResponse';
import { ProfitDistributionDTO } from '../../../../../../Core/interface/Admin/profit';

@Component({
  selector: 'app-profit-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profit-management.html',
  styleUrls: ['./profit-management.scss']
})
export class ProfitManagementComponent implements OnInit {
  loading = false;
  error = '';
  profitDistributions: ProfitDistributionDTO[] = [];
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
      next: (response: GenerialResponse<ProfitDistributionDTO[]>) => {
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
      next: (resp) => {
        if (resp.success) {
          this.loadProfitDistributions();
          this.closeDistributeModal();
        } else {
          this.error = resp.message || 'Failed to distribute profits';
        }
      },
      error: (err) => {
        this.error = 'Error distributing profits';
        console.error('Error distributing profits:', err);
      }
    });
  }
}

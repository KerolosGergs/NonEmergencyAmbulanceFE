import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NurseService } from '../../../../Core/Services/NurseServise/nurse-service';
import { IRequestData } from '../../../../Core/interface/irequest';

@Component({
  selector: 'app-pending-approval-requests',
  imports: [CommonModule, FormsModule,CurrencyPipe],
  templateUrl: './pending-approval-requests.html',
  styleUrls: ['./pending-approval-requests.scss'],
})
export class PendingApprovalRequests implements OnInit {
  // Services
  private readonly _nurseService = inject(NurseService);

  // Inputs & Outputs
  @Input() requests: IRequestData[] = [];
  @Output() selected = new EventEmitter<IRequestData>();

  // State
  searchTerm: string = '';
  selectedEmergencyType: string = '';
  selectedRequestId: number | null = null;
  currentPage: number = 1;
  readonly pageSize: number = 3;

  ngOnInit(): void {
    // Auto-select first request after component initializes
    setTimeout(() => {
      if (this.paginatedRequests.length > 0) {
        this.selectRequest(this.paginatedRequests[0]);
      }
    }, 100);
  }

  /** Filtered requests based on search and emergency type */
  get filteredRequests(): IRequestData[] {
    return (this.requests ?? []).filter(req =>
      (req.patientName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        req.patientId.toString().includes(this.searchTerm)) &&
      (this.selectedEmergencyType === '' || req.emergencyType === this.selectedEmergencyType)
    );
  }

  /** Paginated requests based on current page */
  get paginatedRequests(): IRequestData[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredRequests.slice(start, start + this.pageSize);
  }

  /** Total number of pages */
  get totalPages(): number {
    return Math.ceil(this.filteredRequests.length / this.pageSize);
  }

  /** Selects a request */
  selectRequest(request: IRequestData): void {
    this.selectedRequestId = request.requestId;
    this.selected.emit(request);
  }

  /** Change pagination page */
  changePage(delta: number): void {
    const nextPage = this.currentPage + delta;
    if (nextPage >= 1 && nextPage <= this.totalPages) {
      this.currentPage = nextPage;
      if (this.paginatedRequests.length > 0) {
        this.selectRequest(this.paginatedRequests[0]);
      }
    }
  }

  /** Get emergency type style */
  getEmergencyStyle(type: string): any {
    const styles: { [key: string]: any } = {
      Urgent: { color: 'red' },
      Standard: { color: 'goldenrod' },
      'Special Care': { color: 'blue' },
    };
    return styles[type] || {};
  }

  /** Approve a request */
<<<<<<< Updated upstream
  approveRequest(request: IRequestData): void {
    this.requests = this.requests.filter(r => r.requestId !== request.requestId);
    this._nurseService.assignNurseToRequest(request.requestId, 4).subscribe({
      next: res => console.log('Request approved successfully:', res),
      error: err => console.error('Error approving request:', err),
    });
  }
=======
 approveRequest(request: IRequest): void {
  const dto: IAssignNurse = {
    RequestId: request.requestId,
    NurseId:this._AuthService.getProfileId()!
    // NurseId: this._AuthService.getProfileId()!
  };

  this._RequestService.assignNurse(dto).subscribe({
    next: (res) => {
      if (res.success) {
        // Remove the approved request from the list
        this.requests = this.requests.filter(r => r.requestId !== request.requestId);

        // Success Toast Message
        this.toastr.success(res.message || 'Request approved successfully!', 'Success');

      } else {
        // Handle API returned failure case
        this.toastr.error(res.message || 'Failed to approve the request.', 'Error');
      }
    },
    error: (err) => {
      console.error('Error approving request:', err);
      this.toastr.error('An error occurred while approving the request.', 'Error');
    }
  });
}
>>>>>>> Stashed changes

  /** Decline a request */
  declineRequest(request: IRequestData): void {
    this.requests = this.requests.filter(r => r.requestId !== request.requestId);
    if (this.paginatedRequests.length > 0) {
      this.selectRequest(this.paginatedRequests[0]);
    }
  }


}

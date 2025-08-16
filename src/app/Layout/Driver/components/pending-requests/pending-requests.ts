import { AuthService } from './../../../../Core/Services/AuthServices/auth-service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DriverService } from '../../../../Core/Services/Driver/driver';
import { IAssignDriver, IRequest, RequestStatus } from '../../../../Core/interface/Request/irequest';
import { RequestService } from '../../../../Core/Services/RequestService/request-service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pending-requests',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './pending-requests.html',
  styleUrl: './pending-requests.scss'
})
export class DriverPendingRequests implements OnInit {
 // Services
  private readonly _DriverService = inject(DriverService);
  private readonly _RequestService = inject(RequestService);
  private readonly _AuthService = inject(AuthService);
  // Inputs & Outputs
requests: IRequest[] = [];
  // @Output() selected = new EventEmitter<IRequest>();
  toastr = inject(ToastrService);

  // State
  searchTerm: string = '';
  selectedEmergencyType: string = '';
  selectedRequestId: number | null = null;
  currentPage: number = 1;
  readonly pageSize: number = 3;

  ngOnInit(): void {
    this.getRequests();
    // Auto-select first request after component initializes
    setTimeout(() => {
      if (this.paginatedRequests.length > 0) {
        this.selectRequest(this.paginatedRequests[0]);
      }
    }, 100);
  }

  getRequests(): void 
  {
    this._RequestService.getAvailableRequestsForDrivers().subscribe({
      next: (res) => {
        this.requests = res.data;
      },
      error: (err) => {
        console.error('Error fetching requests:', err);
      }
    })

   }
  /** Filtered requests based on search and emergency type */
  get filteredRequests(): IRequest[] {
    return (this.requests ?? []).filter(req =>
      (req.patientName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        req.patientId.toString().includes(this.searchTerm)) &&
      (this.selectedEmergencyType === '' || req.emergencyType === this.selectedEmergencyType)
    );
  }

  /** Paginated requests based on current page */
  get paginatedRequests(): IRequest[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredRequests.slice(start, start + this.pageSize);
  }

  /** Total number of pages */
  get totalPages(): number {
    return Math.ceil(this.filteredRequests.length / this.pageSize);
  }

  /** Selects a request */
  selectRequest(request: IRequest): void {
    this.selectedRequestId = request.requestId;
    // this.selected.emit(request);
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
 approveRequest(request: IRequest): void {
  const dto: IAssignDriver = {
    DriverId:this._AuthService.getProfileId()!,
    requestId:request.requestId
    // NurseId: this._AuthService.getProfileId()!
  };

  this._RequestService.assignDriver(dto).subscribe({
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

  /** Decline a request */
  declineRequest(request: IRequest): void {
    this.requests = this.requests.filter(r => r.requestId !== request.requestId);
    if (this.paginatedRequests.length > 0) {
      this.selectRequest(this.paginatedRequests[0]);
    }
  }


}

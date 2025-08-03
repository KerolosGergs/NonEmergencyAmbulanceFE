import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NurseService } from '../../../../Core/Services/NurseServise/nurse-service';
import { IRequestData } from '../../../../Core/interface/irequest';
import { IAssignNurse, IRequest } from '../../../../Core/interface/Request/irequest';
import { RequestService } from '../../../../Core/Services/RequestService/request-service';
import { AuthService } from '../../../../Core/Services/AuthServices/auth-service';

@Component({
  selector: 'app-pending-approval-requests',
  imports: [CommonModule, FormsModule],
  templateUrl: './pending-approval-requests.html',
  styleUrls: ['./pending-approval-requests.scss'],
})
export class PendingApprovalRequests implements OnInit {
  // Services
  private readonly _nurseService = inject(NurseService);
  private readonly _RequestService = inject(RequestService);
  private readonly _AuthService = inject(AuthService);
  // Inputs & Outputs
  @Input() requests: IRequest[] = [];
  @Output() selected = new EventEmitter<IRequest>();

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
  approveRequest(request: IRequest): void {
   
    this.requests = this.requests.filter(r => r.requestId !== request.requestId);

     const dto:IAssignNurse  ={
      RequestId: request.requestId,
      NurseId: this._AuthService.getId()
    };
    this._RequestService.assignNurse(dto).subscribe({
      next: res => console.log('Request approved successfully:', res),
      error: err => console.error('Error approving request:', err),
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

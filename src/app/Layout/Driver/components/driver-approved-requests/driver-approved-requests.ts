import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../Core/Services/AuthServices/auth-service';
import { RequestService } from '../../../../Core/Services/RequestService/request-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // UPDATED: if you later want stream-level grouping
import { IRequest, RequestStatus } from '../../../../Core/interface/Request/irequest';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-driver-approved-requests',
  imports: [FormsModule, ReactiveFormsModule, NgClass, DatePipe, CommonModule],
  templateUrl: './driver-approved-requests.html',
  styleUrl: './driver-approved-requests.scss'
})
export class DriverApprovedRequests {
 private _requests = inject(RequestService);
  private _auth = inject(AuthService);

  requests$!: Observable<IRequest[]>;
  DriverId!: number;

  RequestStatus = RequestStatus;

  // UPDATED: tabs model + active tab
  tabs = [
    { key: RequestStatus.Pending,     label: 'Pending' },
    { key: RequestStatus.Accepted,    label: 'Accepted' },
    { key: RequestStatus.Rejected,    label: 'Rejected' },
    { key: RequestStatus.InProgress,  label: 'In Progress' },
    { key: RequestStatus.Completed,   label: 'Completed' },
    { key: RequestStatus.Cancelled,   label: 'Cancelled' }
  ];
  activeStatus: RequestStatus = RequestStatus.Pending; // UPDATED: default tab

  ngOnInit(): void {
    const profileId = this._auth.getProfileId();
    if (!profileId) return;
    this.DriverId = profileId;

    this.requests$ = this._requests.getAssignedRequestsByNurse(this.DriverId);
  }

  // UPDATED: filter helpers for template
  filterByStatus(list: IRequest[], status: RequestStatus): IRequest[] {
    return (list ?? []).filter(r => r.status === status);
  }

  // UPDATED: count badge helper
  countByStatus(list: IRequest[], status: RequestStatus): number {
    return (list ?? []).reduce((acc, r) => acc + (r.status === status ? 1 : 0), 0);
  }


  getStatusText(status: number): string {
    switch (status) {
      case RequestStatus.Pending:     return 'Pending';
      case RequestStatus.Accepted:    return 'Accepted';
      case RequestStatus.Rejected:    return 'Rejected';
      case RequestStatus.InProgress:  return 'In Progress';
      case RequestStatus.Completed:   return 'Completed';
      case RequestStatus.Cancelled:   return 'Cancelled';
      default:                        return 'Unknown';
    }
  }

  getStatusClass(status: number): string {
    switch (status) {
      case RequestStatus.Pending:     return 'bg-warning text-dark';
      case RequestStatus.Accepted:    return 'bg-info';
      case RequestStatus.Rejected:    return 'bg-danger';
      case RequestStatus.InProgress:  return 'bg-primary';
      case RequestStatus.Completed:   return 'bg-success';
      case RequestStatus.Cancelled:   return 'bg-secondary';
      default:                        return 'bg-light text-dark';
    }
  }
  getActiveTabLabel(): string {
  const tab = this.tabs.find(x => x.key === this.activeStatus);
  return tab ? tab.label : '';
}

}

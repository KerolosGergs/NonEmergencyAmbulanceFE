import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../Core/Services/AuthServices/auth-service';
import { RequestService } from '../../../../Core/Services/RequestService/request-service';
import { Observable } from 'rxjs';
import { IRequest, RequestStatus } from '../../../../Core/interface/Request/irequest';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-approved-request',
  imports: [FormsModule, ReactiveFormsModule, NgClass, DatePipe, CommonModule],
  templateUrl: './approved-request.html',
  styleUrl: './approved-request.scss'
})
export class ApprovedRequest implements OnInit {
  private _requests = inject(RequestService);
  private _auth = inject(AuthService);

  requests$!: Observable<IRequest[]>;
  nurseId!: number;

  // expose enum to template only if you plan to reference it there
  RequestStatus = RequestStatus;

  ngOnInit(): void {
    const profileId = this._auth.getProfileId();
    if (!profileId) return;
    this.nurseId = profileId;

    this.requests$ = this._requests.getAssignedRequestsByNurse(this.nurseId);
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
}

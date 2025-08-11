import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../../../../Core/Services/PatientServise/patient-service';
import { RequestService } from '../../../../Core/Services/RequestService/request-service';
import { AuthService } from '../../../../Core/Services/AuthServices/auth-service';
import { PatientRequest, RequestStatus } from '../../../../Core/interface/Patient/ipatient';
import { Environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-patient-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-requests.html',
  styleUrls: ['./patient-requests.scss']
})
export class PatientRequestsComponent implements OnInit {
  private readonly patientService = inject(PatientService);
  private readonly requestService = inject(RequestService);
  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);

  requests: PatientRequest[] = [];
  isProcessing = false;
  loading = false;
  error = '';

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    // const patientId = this.authService.getProfileId();
    const patientId = 7;    

    if (!patientId) {
      this.error = 'Not authenticated';
      return;
    }
    this.loading = true;
    this.patientService.getPatientRequests(patientId).subscribe({
      next: (res) => {
        this.requests = res.data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load requests';
        this.loading = false;
      }
    });
  }

  confirmRequest(requestId: number): void {
    this.isProcessing = true;
    this.requestService.confirmRequestByPatient(requestId).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(response.message, 'Success');
          this.loadRequests();
        } else {
          this.toastr.error(response.message, 'Error');
        }
        this.isProcessing = false;
      },
      error: (err) => {
        this.toastr.error('Error confirming request', 'Error');
        this.isProcessing = false;
      }
    });
  }

  cancelRequest(requestId: number): void {
    this.isProcessing = true;
    try {
      this.requestService.cancelRequest(requestId);
      this.toastr.warning('Request has been cancelled.', 'Cancelled');
      this.loadRequests();
    } catch {
      this.toastr.error('Failed to cancel request. Please try again.', 'Error');
    } finally {
      this.isProcessing = false;
    }
  }

  getStatusText(status: RequestStatus): string {
    switch (status) {
      case RequestStatus.Pending: return 'Pending';
      case RequestStatus.Accepted: return 'Accepted';
      case RequestStatus.Rejected: return 'Rejected';
      case RequestStatus.InProgress: return 'In Progress';
      case RequestStatus.Completed: return 'Completed';
      case RequestStatus.Cancelled: return 'Cancelled';
      default: return 'Unknown';
    }
  }

  getStatusClass(status: RequestStatus): string {
    switch (status) {
      case RequestStatus.Pending: return 'badge bg-warning';
      case RequestStatus.Accepted: return 'badge bg-primary';
      case RequestStatus.Rejected: return 'badge bg-danger';
      case RequestStatus.InProgress: return 'badge bg-info';
      case RequestStatus.Completed: return 'badge bg-success';
      case RequestStatus.Cancelled: return 'badge bg-secondary';
      default: return 'badge bg-light';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }

  getImageUrl(imagePath?: string): string {
    if (!imagePath) return 'assets/default-avatar.png';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    return Environment.ImgUrl + imagePath;
  }

  getEstimatedPrice(req: PatientRequest): number {
    let base = 50;
    switch ((req.emergencyType || '').toLowerCase()) {
      case 'critical': base += 100; break;
      case 'urgent': base += 75; break;
      case 'non-urgent': base += 25; break;
      default: base += 50;
    }
    base += 25;
    return base;
  }
  getStatusIconClasses(status: RequestStatus): string[] {
  switch (status) {
    case RequestStatus.Pending:     return ['bi', 'bi-hourglass-split', 'text-warning'];
    case RequestStatus.Accepted:    return ['bi', 'bi-check2-circle', 'text-primary'];
    case RequestStatus.Rejected:    return ['bi', 'bi-x-circle', 'text-danger'];
    case RequestStatus.InProgress:  return ['bi', 'bi-arrow-repeat', 'text-info', 'spin'];
    case RequestStatus.Completed:   return ['bi', 'bi-patch-check', 'text-success'];
    case RequestStatus.Cancelled:   return ['bi', 'bi-slash-circle', 'text-secondary'];
    default:                        return ['bi', 'bi-question-circle', 'text-muted'];
  }
}
}
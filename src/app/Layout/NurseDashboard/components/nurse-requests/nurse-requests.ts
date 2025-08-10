import { CommonModule, DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RequestService } from '../../../../Core/Services/RequestService/request-service';
import { AuthService } from '../../../../Core/Services/AuthServices/auth-service';
import { Router } from '@angular/router';
import { IRequest } from '../../../../Core/interface/Request/irequest';

@Component({
  selector: 'app-nurse-requests',
  imports: [CommonModule, FormsModule, DatePipe, DecimalPipe],
  templateUrl: './nurse-requests.html',
  styleUrl: './nurse-requests.scss'
})
export class NurseRequests  implements OnInit{
  private _requestService = inject(RequestService);
  private _router = inject(Router);
  private _authService = inject(AuthService);
  
  nurseId = this._authService.getProfileId();
  loading = false;
  error: string | null = null;

  all: IRequest[] = [];
  filtered: IRequest[] = [];

  // quick UI state
  q = '';
  sortBy: 'scheduledDate' | 'price' = 'scheduledDate';
  sortDir: 'desc' | 'asc' = 'desc';

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    if (!this.nurseId) return;
    this.loading = true;
    this.error = null;

    this._requestService.getRequestsByNurse(this.nurseId).subscribe({
      next: (reqs) => {
        this.all = reqs ?? [];
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load requests.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    const q = this.q.trim().toLowerCase();
    this.filtered = this.all.filter(r => {
      if (!q) return true;
      const text = [
        r.patientName, r.patientPhone, r.pickupAddress, r.dropOffAddress, r.emergencyType
      ].filter(Boolean).join(' ').toLowerCase();
      return text.includes(q);
    });

    this.filtered.sort((a, b) => {
      const dir = this.sortDir === 'asc' ? 1 : -1;
      if (this.sortBy === 'price') {
        const ap = a.price ?? 0, bp = b.price ?? 0;
        return (+ap - +bp) * dir;
      }
      // scheduledDate default
      return (new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()) * dir;
    });
  }

  get totalMoney(): number {
    return this.filtered.reduce((s, r) => s + +(r.price ?? 0), 0);
  }


  statusText(s: number | null | undefined): string {
    // adjust mapping to your backend enum if different
    switch (s) {
      case 0: return 'Pending';
      case 1: return 'Confirmed';
      case 2: return 'Completed';
      case 3: return 'Cancelled';
      default: return 'Unknown';
    }
  }

  statusBadgeClass(s: number | null | undefined): string {
    switch (s) {
      case 0: return 'bg-warning text-dark';
      case 1: return 'bg-info';
      case 2: return 'bg-success';
      case 3: return 'bg-secondary';
      default: return 'bg-light text-dark';
    }
  }

  viewDetails(req: IRequest) {
    // navigate if you have a details page
    // this._router.navigate(['/requests', req.requestId]);
    console.log('view', req);
  }

  assignYourself(req: IRequest) {
    // hook your API call here
    console.log('assign', req);
  }
}

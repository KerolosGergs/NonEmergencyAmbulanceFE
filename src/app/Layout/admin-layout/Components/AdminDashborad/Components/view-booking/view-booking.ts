import { RequestService } from './../../../../../../Core/Services/RequestService/request-service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRequest } from '../../../../../../Core/interface/Admin/iadmin';
import { ActivatedRoute, Router } from '@angular/router';
import { IRequest } from '../../../../../../Core/interface/Request/irequest';

@Component({
  selector: 'app-booking-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-booking.html',
  styleUrls: ['./view-booking.scss']
})
export class BookingViewComponent implements OnInit {
 booking!: IRequest;

  statusLabels: { [key: number]: string } = {
    0: 'Pending',
    1: 'Accepted',
    2: 'Rejected',
    3: 'In Progress',
    4: 'Completed',
    5: 'Cancelled'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    const bookingId = this.route.snapshot.paramMap.get('id');
    if (bookingId) {
      this.loadBooking(+bookingId);
    } else {
      this.router.navigate(['/admin']); // Redirect if ID is missing
    }
  }

  private loadBooking(id: number): void {
    this.requestService.getRequestById(id).subscribe({
      next: (data) => {
        this.booking = data.data;
      },
      error: (err) => {
        console.error('Booking not found', err);
        this.router.navigate(['/admin']); // Redirect on error
      }
    });
  }

  getStatusText(status: number): string {
    return this.statusLabels[status] ?? 'Unknown';
  }

  getStatusBadgeClass(status: number): string {
    switch (status) {
      case 0: return 'badge bg-warning text-dark';
      case 1: return 'badge bg-success';
      case 2: return 'badge bg-danger';
      case 3: return 'badge bg-primary';
      case 4: return 'badge bg-info';
      case 5: return 'badge bg-secondary';
      default: return 'badge bg-secondary';
    }
  }

  onClose(): void {
    this.router.navigate(['/admin']); // Close and go back
  }
}
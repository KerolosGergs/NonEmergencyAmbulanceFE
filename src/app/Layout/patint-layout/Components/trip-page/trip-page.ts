import { PatientService } from './../../../../Core/Services/PatientServise/patient-service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripService } from '../../../../Core/Services/TripService/trip';
import { ITrip, TripStatus } from '../../../../Core/interface/Trip/itrip';
import { AuthService } from '../../../../Core/Services/AuthServices/auth-service';
import { Environment } from '../../../../../environments/environment';
import { TripTracker } from "../trip-tracker/trip-tracker";

@Component({
  selector: 'app-trip-page',
  standalone: true,
  imports: [CommonModule, TripTracker],
  templateUrl: './trip-page.html',
  styleUrls: ['./trip-page.scss']
})
export class TripPage implements OnInit {
  private readonly tripService = inject(TripService);
  private readonly authService = inject(AuthService);
  private readonly PatientService = inject(PatientService);

  trips: ITrip[] = [];
  todayTrips: ITrip[] = [];
  upcomingTrips: ITrip[] = [];
  completedTrips: ITrip[] = [];

  loading = false;
  error = '';
  selectedTab: 'today' | 'upcoming' | 'completed' = 'today';

  ngOnInit(): void {
    this.loadPatientTrips();
  }

  loadPatientTrips(): void {
    this.loading = true;
    const patientId = this.authService.getProfileId();
    // const patientId: number = 7;

    if (!patientId) {
      this.trips = [];
      this.sliceBuckets();
      this.loading = false;
      return;
    }

    this.PatientService.getPatientTrips(patientId).subscribe({
      next: (response) => {
        if (response?.success && Array.isArray(response.data)) {
          this.trips = response.data ?? [];
          this.sliceBuckets();
        } else {
          this.error = 'Failed to load trips';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching trips:', err);
        this.error = 'Error loading trips';
        this.loading = false;
      }
    });
  }

  /** Bucket trips into Today / Upcoming / Completed */
  private sliceBuckets(): void {
    const today = new Date();
    const isSameDay = (a: Date, b: Date) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    this.todayTrips = [];
    this.upcomingTrips = [];
    this.completedTrips = [];

    for (const t of this.trips) {
      const start = new Date(t.startTime);
      if (t.tripStatus === TripStatus.Completed) {
        this.completedTrips.push(t);
      } else if (isSameDay(start, today)) {
        this.todayTrips.push(t);
      } else {
        this.upcomingTrips.push(t);
      }
    }

    // Optional: sort by time
    const byTime = (a: ITrip, b: ITrip) =>
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime();

    this.todayTrips.sort(byTime);
    this.upcomingTrips.sort(byTime);
    this.completedTrips.sort(byTime);
  }

  /** Actions */
  startTrip(tripId: number): void {
    this.loading = true;
    this.tripService.startTrip(tripId).subscribe({
      next: (res) => {
        // re-fetch or optimistically update status
        this.loadPatientTrips();
      },
      error: (err) => {
        console.error('Error starting trip:', err);
        this.loading = false;
      }
    });
  }

  completeTrip(tripId: number): void {
    this.loading = true;
    this.tripService.completeTrip(tripId).subscribe({
      next: (res) => {
        this.loadPatientTrips();
      },
      error: (err) => {
        console.error('Error completing trip:', err);
        this.loading = false;
      }
    });
  }

  /** UI helpers */
  getStatusText(status: number): string {
    const statusMap: Record<number, string> = {
      0: 'Pending',
      1: 'Assigned',
      2: 'Ongoing',
      3: 'Completed',
      4: 'Cancelled',
      5: 'Failed'
    };
    return statusMap[status] ?? 'Unknown';
  }

  getStatusClass(status: number): string {
    switch (status) {
      case TripStatus.Pending: return 'status-pending';
      case TripStatus.Assigned: return 'status-assigned';
      case TripStatus.Ongoing: return 'status-ongoing';
      case TripStatus.Completed: return 'status-completed';
      case TripStatus.Cancelled: return 'status-cancelled';
      case TripStatus.Failed: return 'status-failed';
      default: return 'status-unknown';
    }
  }

  canStart(t: ITrip): boolean {
    return t.tripStatus === TripStatus.Pending || t.tripStatus === TripStatus.Assigned;
  }

  canComplete(t: ITrip): boolean {
    debugger
    return t.tripStatus === TripStatus.Ongoing;
  }

  getImageUrl(imagePath: string | undefined): string {
    if (!imagePath) return 'assets/default-avatar.png';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    return Environment.ImgUrl + imagePath;
  }

  trackByTripId = (_: number, t: ITrip) => t.tripId;
}

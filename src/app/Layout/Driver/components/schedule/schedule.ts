import { TripsStatus } from './../../../../Core/interface/Driver/TripsStatus.enum';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ITripData } from '../../../../Core/interface/itrip-data';

@Component({
  selector: 'app-schedule',
  imports: [CommonModule],
  templateUrl: './schedule.html',
  styleUrl: './schedule.scss'
})
export class Schedule {

  scheduleDate = new Date();
  @Input() items: ITripData[] = [];
  TripsStatus = TripsStatus; // bind to template


  getStatusColor(status: number): string {
  switch (status) {
    case 0: // Pending
    case 1: // Assigned
      return 'primary';
    case 2: // Ongoing
      return 'warning';
    case 3: // Completed
      return 'success';
    case 4: // Cancelled
    case 5: // Failed
      return 'danger';
    default:
      return 'secondary';
  }
}
}

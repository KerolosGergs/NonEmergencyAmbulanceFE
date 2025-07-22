import { NurseService } from './../../../../Core/Services/NurseServise/nurse-service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITripData } from './../../../../Core/interface/itrip-data';
import { Trip } from '../../../../Core/Services/TripService/trip';

@Component({
  selector: 'app-your-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './your-schedule.html',
  styleUrls: ['./your-schedule.scss']
})
export class YourSchedule implements OnInit {
  // Dependencies
  private readonly nurseService = inject(NurseService);

  // Data
  schedule: ITripData[] = [];
  scheduleDate: Date = new Date();

  /** Lifecycle hook */
  ngOnInit(): void {

    this.getTrips(4);
  }

  /** Fetch trip data from service */
  private getTrips(nurseId:number): void {
    this.nurseService.getTripsById(nurseId).subscribe({
      next: (trips) => {
        this.schedule = trips;
      },
      error: (error) => {
        console.error('Error fetching trips:', error);
      }
    });
  }
}

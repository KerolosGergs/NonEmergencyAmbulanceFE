import { TripService } from './../../../../Core/Services/TripService/trip';
import { response } from 'express';
import { NurseService } from './../../../../Core/Services/NurseServise/nurse-service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITrip } from '../../../../Core/interface/Trip/itrip';

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
  private readonly TripService = inject(TripService);

  // Data
  schedule: ITrip[] = [];
  scheduleDate: Date = new Date();

  /** Lifecycle hook */
  ngOnInit(): void {

    this.getTrips(4);
  }

  /** Fetch trip data from service */
  private getTrips(nurseId:number): void {
    this.TripService.getTripsForNurse(nurseId).subscribe({
      next: (response) => {
        if(!response.success){
          
          this.schedule = response.data;
        }
      },
      error: (error) => {
        console.error('Error fetching trips:', error);
      }
    });
  }
}

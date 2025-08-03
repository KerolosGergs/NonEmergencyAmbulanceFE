import { Component, inject } from '@angular/core';
import { DriverHeader } from "../../components/driver-header/driver-header";
import { PendingRequests } from "../../components/pending-requests/pending-requests";
import { TripDetails } from "../../components/trip-details/trip-details";
import { Schedule } from "../../components/schedule/schedule";
import { Nav } from "../../../../Shared/Components/nav/nav";
import { Footer } from "../../../../Shared/Components/footer/footer";
import { DriverService } from '../../../../Core/Services/Driver/driver';
import { TripService } from '../../../../Core/Services/TripService/trip';
import { ITrip } from '../../../../Core/interface/Trip/itrip';

@Component({
  selector: 'app-driver-layout',
  imports: [DriverHeader, PendingRequests, TripDetails, Schedule, Nav, Footer],
  templateUrl: './driver-layout.html',
  styleUrl: './driver-layout.scss'
})
export class DriverLayout {
  currentTrip: ITrip | null = null;
  todaySchedule: ITrip[] = [];
  allTrips: ITrip[] = [];

  private _driverService = inject(DriverService);
  private _tripService = inject(TripService);

  ngOnInit(): void {
    this.getTripsByDriverId(4);
  }

  getTripsByDriverId(driverId: number) {
    this._tripService.getTripsForDriver(driverId).subscribe({
      next: (trips) => {
        this.allTrips = trips.data;
        this.currentTrip = trips.data.find(trip => trip.tripStatus === 2) || null; // Assuming 2 is the status for ongoing trips
        // filtering today's date
        this.todaySchedule = trips.data.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
      },
      error: (error) => {
        console.error('Error fetching trips:', error);
      }
    });
  }
}




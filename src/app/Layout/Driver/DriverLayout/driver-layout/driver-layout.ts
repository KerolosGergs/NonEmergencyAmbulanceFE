import { Component, inject } from '@angular/core';
import { DriverHeader } from "../../components/driver-header/driver-header";
import { PendingRequests } from "../../components/pending-requests/pending-requests";
import { TripDetails } from "../../components/trip-details/trip-details";
import { Schedule } from "../../components/schedule/schedule";
import { Nav } from "../../../../Shared/Components/nav/nav";
import { Footer } from "../../../../Shared/Components/footer/footer";
import { ITripData } from '../../../../Core/interface/itrip-data';
import { Driver } from '../../../../Core/Services/Driver/driver';

@Component({
  selector: 'app-driver-layout',
  imports: [DriverHeader, PendingRequests, TripDetails, Schedule, Nav, Footer],
  templateUrl: './driver-layout.html',
  styleUrl: './driver-layout.scss'
})
export class DriverLayout {
  currentTrip: ITripData | null = null;
  todaySchedule: ITripData[] = [];
  allTrips: ITripData[] = [];

  private _driverService = inject(Driver);

  ngOnInit(): void {
    this.getTripsByDriverId(4);
  }

  getTripsByDriverId(driverId: number) {
    this._driverService.getTripsByDriverId(driverId).subscribe({
      next: (trips) => {
        this.allTrips = trips;
        this.currentTrip = trips.find(trip => trip.tripStatus === 2) || null; // Assuming 2 is the status for ongoing trips
        // filtering today's date
        this.todaySchedule = trips.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
      },
      error: (error) => {
        console.error('Error fetching trips:', error);
      }
    });
  }
}


    // public enum TripStatus
    // {
    //     Pending = 0,
    //     Assigned = 1,
    //     Ongoing = 2,
    //     Completed = 3,
    //     Cancelled = 4,
    //     Failed = 5
    // }

      // {
      //   patient: 'Eleanor Wilson - Facility Transfer',
      //   from: 'Mercy Hospital',
      //   to: 'Sunshine Rehab Center',
      //   time: '10:30 AM - 11:45 AM',
      //   status: 'En Route',
      //   color: 'info',
      //   name: 'Eleanor Wilson',
      //   age: 72,
      //   mobility: 'Wheelchair',
      //   specialInstructions:
      //     'Patient requires oxygen support. Wheelchair accessible vehicle needed. Handle with extra care due to recent hip surgery.',
      //   avatar: 'https://via.placeholder.com/40'
      // }

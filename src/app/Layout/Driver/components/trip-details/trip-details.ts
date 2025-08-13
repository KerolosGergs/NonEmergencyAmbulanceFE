import { Component, Input } from '@angular/core';
import { ITripData } from '../../../../Core/interface/itrip-data';

@Component({
  selector: 'app-trip-details',
  imports: [],
  templateUrl: './trip-details.html',
  styleUrl: './trip-details.scss'
})
export class DriverTripDetails {
    @Input() trip: ITripData | null = null;

}

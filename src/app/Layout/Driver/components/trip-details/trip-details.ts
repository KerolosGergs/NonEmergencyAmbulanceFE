import { Component, Input } from '@angular/core';
import { ITripData } from '../../../../Core/interface/itrip-data';

@Component({
  selector: 'app-trip-details',
  imports: [],
  templateUrl: './trip-details.html',
  styleUrl: './trip-details.scss'
})
export class TripDetails {
    @Input() trip: ITripData | null = null;

}

import { Component } from '@angular/core';
import { Booking } from "../Components/booking/booking";

@Component({
  selector: 'app-admin-layout',
  imports: [Booking],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {

}

import { Component } from '@angular/core';
import { Booking } from "../Components/booking/booking";
import { Footer } from "../../../Shared/Components/footer/footer";
import { Nav } from "../../../Shared/Components/nav/nav";

@Component({
  selector: 'app-admin-layout',
  imports: [Booking, Footer, Nav],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {

}

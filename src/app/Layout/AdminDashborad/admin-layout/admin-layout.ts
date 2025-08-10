import { Component } from '@angular/core';
import { Booking } from "../Components/booking/booking";
<<<<<<< Updated upstream:src/app/Layout/AdminDashborad/admin-layout/admin-layout.ts
=======
import { CommonModule } from '@angular/common';
>>>>>>> Stashed changes:src/app/Layout/admin-layout/Components/AdminDashborad/admin-layout/admin-layout.ts

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, Booking],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {

}

import { Component, inject, signal } from '@angular/core';
import { DriverHeader } from "../../components/driver-header/driver-header";

import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
type MenuItem = { path: string; label: string; icon: string; exact?: boolean };

@Component({
  selector: 'app-driver-layout',
  imports: [DriverHeader,NgClass , RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './driver-layout.html',
  styleUrl: './driver-layout.scss'
})
export class DriverLayout {
  
    private readonly router = inject(Router); // OPTIONAL: for programmatic nav
  
    // UPDATED: sidebar menu (Bootstrap Icons)
    menu: MenuItem[] = [
      { path: 'pending-requests',  label: 'Pending Approval', icon: 'bi-clock-history', exact: true },
      { path: 'approved', label: 'Approved',         icon: 'bi-check2-circle' },
      { path: 'schedule', label: 'Your Schedule',    icon: 'bi-calendar3' },
      { path: 'withdrawal', label: 'Your withdrawal',    icon: 'bi-calendar3' }
  
      // You can show patient details from a row click: /nurse/patient/:id
    ];
  
    ngOnInit(): void {
      // The shell no longer fetches requests; each page loads its own data. // UPDATED
    }
  
    // OPTIONAL: If you want to navigate to the patient page from anywhere in the shell
    goToPatient(id?: number) {
      if (id) this.router.navigate(['/nurse/patient', id]);
    }
  }
  
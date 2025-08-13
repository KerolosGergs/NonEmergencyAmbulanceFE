import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DriverHeader } from '../../components/driver-header/driver-header';

type MenuItem = { path: string; label: string; icon: string; exact?: boolean };

@Component({
  selector: 'app-driver-layout',
  standalone: true,
  imports: [CommonModule, DriverHeader, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './driver-layout.html',
  styleUrls: ['./driver-layout.scss']
})
export class DriverLayout implements OnInit {

  // Sidebar menu (Bootstrap Icons)
  menu: MenuItem[] = [
    { path: 'pending-requests',  label: 'Pending Approval', icon: 'bi-clock-history', exact: true },
    { path: 'approved', label: 'Approved',         icon: 'bi-check2-circle' },
    { path: 'schedule', label: 'Your Schedule',    icon: 'bi-calendar3' },
    { path: 'withdrawal', label: 'Your withdrawal',    icon: 'bi-calendar3' }
    // Additional links can be added here
  ];

  ngOnInit(): void {
    // The shell no longer fetches requests; each page loads its own data.
  }
}
  
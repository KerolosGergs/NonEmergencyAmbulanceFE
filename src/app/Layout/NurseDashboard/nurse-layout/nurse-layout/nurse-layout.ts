import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// UPDATED: use Router directives instead of embedding pages directly
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { NHeader } from '../../components/n-header/n-header';

type MenuItem = { path: string; label: string; icon: string; exact?: boolean };

@Component({
  selector: 'app-nurse-layout',
  standalone: true,
  imports: [
    CommonModule,
    NHeader,
    // UPDATED: routing directives
    RouterLink, RouterLinkActive, RouterOutlet
  ],
  templateUrl: './nurse-layout.html',
  styleUrls: ['./nurse-layout.scss']
})
export class NurseLayout implements OnInit {

  private readonly router = inject(Router); // OPTIONAL: for programmatic nav

  // UPDATED: sidebar menu (Bootstrap Icons)
  menu: MenuItem[] = [
    { path: 'pending',  label: 'Pending Approval', icon: 'bi-clock-history', exact: true },
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

import { NurseService } from '../../../../Core/Services/NurseServise/nurse-service';
import { RequestService } from './../../../../Core/Services/RequestService/request-service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-n-header',
  imports: [],
  templateUrl: './n-header.html',
  styleUrl: './n-header.scss'
})
export class NHeader implements OnInit {
  title = 'Nurse Dashboard';
  date = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  newRequests!: number;

  _nurseService = inject(NurseService);

  ngOnInit(): void {
    this.getRequestCount();
  }

  getRequestCount() {
    this._nurseService.GetUnassignedRequestsForNurse().subscribe({
      next: (data) => {
        this.newRequests = data.length;
      },
      error: (err) => {
        console.error('Error fetching request count:', err);
      }
    });
  }
}

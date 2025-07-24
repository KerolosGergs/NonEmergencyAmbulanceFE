import { Driver } from './../../../../Core/Services/Driver/driver';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IRequestData } from '../../../../Core/interface/irequest';
import { RequestStatus } from '../../../../Core/interface/Driver/request-status.enum';

@Component({
  selector: 'app-pending-requests',
  imports: [CommonModule],
  templateUrl: './pending-requests.html',
  styleUrl: './pending-requests.scss'
})
export class PendingRequests implements OnInit {
  requests: IRequestData[] = [];
  pagedRequests: IRequestData[] = [];
  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 1;

  _driverService= inject(Driver);
  RequestStatus = RequestStatus; // bind to template


  ngOnInit() {
    this.unassignedRequests();
  }

  unassignedRequests() {
    this._driverService.GetUnassignedRequestsForDriver().subscribe({
      next: (data) => {
        this.requests = data;
        this.calculatePagination();
      },
      error: (error) => {
        console.error('Error fetching unassigned requests:', error);
      }
    });
  }

  assignDriverToRequest(requestId: number, driverId: number ) {
    this._driverService.assignNurseToRequest(requestId, driverId).subscribe({
      next: (response) => {
        console.log('Driver assigned successfully:', response);
      },
      error: (error) => {
        console.error('Error assigning driver:', error);
      }});
  }


  refresh() {
    this.unassignedRequests();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.requests.length / this.itemsPerPage);
    this.updatePagedRequests();
  }

  updatePagedRequests() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedRequests = this.requests.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedRequests();
  }


  // Accept & decline BTNs


  Accept(requestId: number) {
  // Remove the request from the original array
  this.requests = this.requests.filter(r => r.requestId !== requestId);
  this.calculatePagination();

  //call a service to update the request status on the server

  this.assignDriverToRequest(requestId, 1004); // Assuming driverId is 4 for this example

}

  Decline(requestId: number) {
    // Remove the request from the original array
    this.requests = this.requests.filter(r => r.requestId !== requestId);
    this.calculatePagination();
  }

}

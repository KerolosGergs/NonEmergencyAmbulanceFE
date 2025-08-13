import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IRequestData } from '../../../../Core/interface/irequest';
import { DriverService } from '../../../../Core/Services/Driver/driver';
import { IRequest, RequestStatus } from '../../../../Core/interface/Request/irequest';
import { RequestService } from '../../../../Core/Services/RequestService/request-service';

@Component({
  selector: 'app-pending-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-requests.html',
  styleUrl: './pending-requests.scss'
})
export class DriverPendingRequests implements OnInit {
  requests: IRequest[] = [];
  pagedRequests: IRequest[] = [];
  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 1;

  _driverService= inject(DriverService);
  _requestService = inject(RequestService);
  RequestStatus = RequestStatus; // bind to template


  ngOnInit() {
    this.unassignedRequests();
  }

  unassignedRequests() {
    this._requestService.getAvailableRequestsForDrivers().subscribe({
      next: (data) => {
        this.requests = data.data;
        this.calculatePagination();
      },
      error: (error) => {
        console.error('Error fetching unassigned requests:', error);
      }
    });
  }

  assignDriverToRequest(requestId: number, DriverId: number ) {

    this._requestService.assignDriver(  {DriverId, requestId} ).subscribe({
      next: (response) => {
        if(response.success){
          this.requests = this.requests.filter(r => r.requestId !== requestId);
          this.calculatePagination();
        }
        else {
          console.error('Error assigning driver:', response.message);
        }
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
 

  //call a service to update the request status on the server

  this.assignDriverToRequest(requestId, 1); // Assuming driverId is 4 for this example

}

  Decline(requestId: number) {
    // Remove the request from the original array
    this.requests = this.requests.filter(r => r.requestId !== requestId);
    this.calculatePagination();
  }

}

import { AdminService } from './../../../../../../Core/Services/AdminServices/admin-service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IBooking } from '../../../../../../Core/interface/request-data';
import { AdminRequest } from '../../../../../../Core/interface/Admin/iadmin';
import { Router } from '@angular/router';
import { IRequest } from '../../../../../../Core/interface/Request/irequest';




@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.scss'
})
export class Booking implements OnInit {
  Math = Math; // Make Math available in template
  adminService = inject(AdminService);
  bookings: AdminRequest[] = [];
  filteredBookings: AdminRequest[] = [];


  selectedStatus: string = '';
  selectedDateRange: string = '';
  searchTerm: string = '';

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = this.bookings.length;

  router = inject(Router);
  // Status options for filter
  statusOptions = [
    { value: '', label: 'All Bookings' },
    { value: 0, label: 'Pending' },
    { value: 1, label: 'Accepted' },
    { value: 2, label: 'Rejected' },
    { value: 3, label: 'InProgress' },
    { value: 4, label: 'Completed' },
    { value: 5, label: 'Cancelled' }
  ];

  constructor() {
    this.applyFilters();
  }


  getallBookings() {
    this.adminService.getAdminRequests().subscribe(res => {
      if (res.success) {
        this.bookings = res.data;
        this.totalItems = this.bookings.length;
        this.applyFilters();

      }
    });
  }
  ngOnInit(): void {
    this.getallBookings();
  }

  // Filter methods
  onStatusChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onDateRangeChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredBookings = this.bookings.filter(booking => {
      const matchesStatus = !this.selectedStatus || booking.status.toString() === this.selectedStatus;
      const matchesSearch = !this.searchTerm ||
        booking.patientName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        booking.requestId.toString().toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });

    this.totalItems = this.filteredBookings.length;
  }

  // Pagination methods
  get paginatedBookings(): IBooking[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredBookings.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }


  statusLabels: { [key: number]: string } = {
    0: 'Pending',
    1: 'Accepted',
    2: 'Rejected',
    3: 'In Progress',
    4: 'Completed',
    5: 'Cancelled'
  };

  getStatusText(status: number): string {
    return this.statusLabels[status] ?? 'Unknown';
  }

viewBooking(booking: IRequest): void {
  this.router.navigate(['/admin/ViewRequest/', booking.requestId]);
}

  editBooking(booking: IBooking): void {
    console.log('Edit booking:', booking);
    // Implement edit logic
  }

  deleteBooking(booking: IBooking): void {
    console.log('Delete booking:', booking);
    // Implement delete logic
  }
  getStatusBadgeClass(status: number): string {
    switch (status) {
      case 0: return 'badge bg-warning text-dark';
      case 1: return 'badge bg-success';
      case 2: return 'badge bg-danger';
      case 3: return 'badge bg-primary';
      case 4: return 'badge bg-info';
      case 5: return 'badge bg-danger';

      default: return 'badge bg-secondary';
    }
  }

}





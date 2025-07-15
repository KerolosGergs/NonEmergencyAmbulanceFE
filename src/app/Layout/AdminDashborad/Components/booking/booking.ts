import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface IBooking {
  id: string;
  patientName: string;
  dateTime: string;
  pickupLocation: string;
  destination: string;
  status: 'Pending' | 'Approved' | 'In Progress' | 'Completed' | 'Cancelled';
  assignedNurse: string;
  assignedDriver: string;
}

@Component({
  selector: 'app-booking',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.scss'
})
export class Booking {
 Math = Math; // Make Math available in template

  bookings: IBooking[] = [
    {
      id: 'BK-2023-1458',
      patientName: 'Robert Thompson',
      dateTime: 'Oct 15, 2023 - 10:30 AM',
      pickupLocation: '42 Maple Street, Westfield',
      destination: 'St. Mary\'s Hospital',
      status: 'Pending',
      assignedNurse: 'Not assigned',
      assignedDriver: 'Not assigned'
    },
    {
      id: 'BK-2023-1467',
      patientName: 'Maria Garcia',
      dateTime: 'Oct 15, 2023 - 9:00 AM',
      pickupLocation: '128 Oak Drive, Eastville',
      destination: 'Riverside Medical Center',
      status: 'Approved',
      assignedNurse: 'Sarah Johnson',
      assignedDriver: 'Michael Brown'
    },
    {
      id: 'BK-2023-1456',
      patientName: 'James Wilson',
      dateTime: 'Oct 14, 2023 - 2:15 PM',
      pickupLocation: '75 Pine Avenue, Northtown',
      destination: 'Central Medical Clinic',
      status: 'In Progress',
      assignedNurse: 'Emily Davis',
      assignedDriver: 'David Martinez'
    },
    {
      id: 'BK-2023-1455',
      patientName: 'Patricia Lee',
      dateTime: 'Oct 14, 2023 - 11:30 AM',
      pickupLocation: '314 Cedar Lane, Southport',
      destination: 'Memorial Hospital',
      status: 'Completed',
      assignedNurse: 'Jennifer White',
      assignedDriver: 'Thomas Rodriguez'
    },
    {
      id: 'BK-2023-1454',
      patientName: 'William Taylor',
      dateTime: 'Oct 13, 2023 - 3:45 PM',
      pickupLocation: '89 Birch Road, Westside',
      destination: 'Community Health Center',
      status: 'Cancelled',
      assignedNurse: 'Not assigned',
      assignedDriver: 'Not assigned'
    },
    {
      id: 'BK-2023-1458',
      patientName: 'Robert Thompson',
      dateTime: 'Oct 15, 2023 - 10:30 AM',
      pickupLocation: '42 Maple Street, Westfield',
      destination: 'St. Mary\'s Hospital',
      status: 'Pending',
      assignedNurse: 'Not assigned',
      assignedDriver: 'Not assigned'
    },
    {
      id: 'BK-2023-1467',
      patientName: 'Maria Garcia',
      dateTime: 'Oct 15, 2023 - 9:00 AM',
      pickupLocation: '128 Oak Drive, Eastville',
      destination: 'Riverside Medical Center',
      status: 'Approved',
      assignedNurse: 'Sarah Johnson',
      assignedDriver: 'Michael Brown'
    },
    {
      id: 'BK-2023-1456',
      patientName: 'James Wilson',
      dateTime: 'Oct 14, 2023 - 2:15 PM',
      pickupLocation: '75 Pine Avenue, Northtown',
      destination: 'Central Medical Clinic',
      status: 'In Progress',
      assignedNurse: 'Emily Davis',
      assignedDriver: 'David Martinez'
    },
    {
      id: 'BK-2023-1455',
      patientName: 'Patricia Lee',
      dateTime: 'Oct 14, 2023 - 11:30 AM',
      pickupLocation: '314 Cedar Lane, Southport',
      destination: 'Memorial Hospital',
      status: 'Completed',
      assignedNurse: 'Jennifer White',
      assignedDriver: 'Thomas Rodriguez'
    },
    {
      id: 'BK-2023-1454',
      patientName: 'William Taylor',
      dateTime: 'Oct 13, 2023 - 3:45 PM',
      pickupLocation: '89 Birch Road, Westside',
      destination: 'Community Health Center',
      status: 'Cancelled',
      assignedNurse: 'Not assigned',
      assignedDriver: 'Not assigned'
    }
  ];

  filteredBookings: IBooking[] = [...this.bookings];
  
  // Filter properties
  selectedStatus: string = '';
  selectedDateRange: string = '';
  searchTerm: string = '';
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = this.bookings.length;

  // Status options for filter
  statusOptions = [
    { value: '', label: 'All Bookings' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Approved', label: 'Approved' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  constructor() {
    this.applyFilters();
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
      const matchesStatus = !this.selectedStatus || booking.status === this.selectedStatus;
      const matchesSearch = !this.searchTerm || 
        booking.patientName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        booking.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      
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

  // Action methods
  viewBooking(booking: IBooking): void {
    console.log('View booking:', booking);
    // Implement view logic
  }

  editBooking(booking: IBooking): void {
    console.log('Edit booking:', booking);
    // Implement edit logic
  }

  deleteBooking(booking: IBooking): void {
    console.log('Delete booking:', booking);
    // Implement delete logic
  }

  // Status badge class helper
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Pending': return 'badge bg-warning text-dark';
      case 'Approved': return 'badge bg-success';
      case 'In Progress': return 'badge bg-primary';
      case 'Completed': return 'badge bg-info';
      case 'Cancelled': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }
}


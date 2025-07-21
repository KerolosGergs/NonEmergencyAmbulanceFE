import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Driver, FilterOptions, PaginationInfo, getStatusBadgeClass } from '../../models/interfaces';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-drivers-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drivers-table.html',
  styleUrl: './drivers-table.css'
})
export class DriversTableComponent implements OnInit {
  drivers: Driver[] = [];
  filteredDrivers: Driver[] = [];
  loading = false;
  
  filter: FilterOptions = {
    searchTerm: '',
    availabilityFilter: 'all',
    statusFilter: 'all'
  };

  pagination: PaginationInfo = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.loading = true;
    this.dataService.getDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading drivers:', error);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.drivers];

    // Search filter
    if (this.filter.searchTerm) {
      const searchTerm = this.filter.searchTerm.toLowerCase();
      filtered = filtered.filter(driver => 
        driver.userFullName.toLowerCase().includes(searchTerm) ||
        driver.licenseNumber.toLowerCase().includes(searchTerm) ||
        driver.phoneNumber.includes(searchTerm)
      );
    }

    // Availability filter
    if (this.filter.availabilityFilter !== 'all') {
      const isAvailable = this.filter.availabilityFilter === 'available';
      filtered = filtered.filter(driver => driver.isAvailable === isAvailable);
    }

    this.filteredDrivers = filtered;
    this.updatePagination();
  }

  updatePagination(): void {
    this.pagination.totalItems = this.filteredDrivers.length;
    this.pagination.totalPages = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);
    
    if (this.pagination.currentPage > this.pagination.totalPages) {
      this.pagination.currentPage = 1;
    }
  }

  getPaginatedDrivers(): Driver[] {
    const startIndex = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
    const endIndex = startIndex + this.pagination.itemsPerPage;
    return this.filteredDrivers.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.pagination.totalPages) {
      this.pagination.currentPage = page;
    }
  }

  onFilterChange(): void {
    this.pagination.currentPage = 1;
    this.applyFilters();
  }

  toggleAvailability(driver: Driver): void {
    this.dataService.updateDriverAvailability(driver.id, !driver.isAvailable).subscribe({
      next: (success) => {
        if (success) {
          driver.isAvailable = !driver.isAvailable;
        }
      },
      error: (error) => {
        console.error('Error updating driver availability:', error);
      }
    });
  }

  deleteDriver(driver: Driver): void {
    if (confirm(`Are you sure you want to delete ${driver.userFullName}?`)) {
      this.dataService.deleteDriver(driver.id).subscribe({
        next: (success) => {
          if (success) {
            this.loadDrivers();
          }
        },
        error: (error) => {
          console.error('Error deleting driver:', error);
        }
      });
    }
  }

  editDriver(driver: Driver): void {
    // Placeholder for edit functionality
    alert(`Edit functionality for ${driver.userFullName} would be implemented here`);
  }

  getStatusBadgeClass(isAvailable: boolean): string {
    return getStatusBadgeClass(isAvailable);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.pagination.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}


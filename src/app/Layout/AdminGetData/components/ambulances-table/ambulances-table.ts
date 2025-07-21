import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ambulance, FilterOptions, PaginationInfo, AmbulanceStatus, getAmbulanceStatusLabel, getAmbulanceTypeLabel, getAmbulanceStatusBadgeClass } from '../../models/interfaces';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-ambulances-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ambulances-table.html',
  styleUrl: './ambulances-table.css'
})
export class AmbulancesTableComponent implements OnInit {
  ambulances: Ambulance[] = [];
  filteredAmbulances: Ambulance[] = [];
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

  // Status options for filter
  statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: '0', label: getAmbulanceStatusLabel(AmbulanceStatus.AVAILABLE) },
    { value: '1', label: getAmbulanceStatusLabel(AmbulanceStatus.IN_USE) },
    { value: '2', label: getAmbulanceStatusLabel(AmbulanceStatus.MAINTENANCE) },
    { value: '3', label: getAmbulanceStatusLabel(AmbulanceStatus.OUT_OF_SERVICE) }
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadAmbulances();
  }

  loadAmbulances(): void {
    this.loading = true;
    this.dataService.getAmbulances().subscribe({
      next: (data) => {
        this.ambulances = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading ambulances:', error);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.ambulances];

    // Search filter
    if (this.filter.searchTerm) {
      const searchTerm = this.filter.searchTerm.toLowerCase();
      filtered = filtered.filter(ambulance => 
        ambulance.plateNumber.toLowerCase().includes(searchTerm) ||
        ambulance.currentLocation.toLowerCase().includes(searchTerm) ||
        this.dataService.getDriverName(ambulance.driverId).toLowerCase().includes(searchTerm)
      );
    }

    // Status filter
    if (this.filter.statusFilter !== 'all') {
      const status = parseInt(this.filter.statusFilter);
      filtered = filtered.filter(ambulance => ambulance.status === status);
    }

    this.filteredAmbulances = filtered;
    this.updatePagination();
  }

  updatePagination(): void {
    this.pagination.totalItems = this.filteredAmbulances.length;
    this.pagination.totalPages = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);
    
    if (this.pagination.currentPage > this.pagination.totalPages) {
      this.pagination.currentPage = 1;
    }
  }

  getPaginatedAmbulances(): Ambulance[] {
    const startIndex = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
    const endIndex = startIndex + this.pagination.itemsPerPage;
    return this.filteredAmbulances.slice(startIndex, endIndex);
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

  updateStatus(ambulance: Ambulance, newStatus: AmbulanceStatus): void {
    this.dataService.updateAmbulanceStatus(ambulance.plateNumber, newStatus).subscribe({
      next: (success) => {
        if (success) {
          ambulance.status = newStatus;
        }
      },
      error: (error) => {
        console.error('Error updating ambulance status:', error);
      }
    });
  }

  deleteAmbulance(ambulance: Ambulance): void {
    if (confirm(`Are you sure you want to delete ambulance ${ambulance.plateNumber}?`)) {
      this.dataService.deleteAmbulance(ambulance.plateNumber).subscribe({
        next: (success) => {
          if (success) {
            this.loadAmbulances();
          }
        },
        error: (error) => {
          console.error('Error deleting ambulance:', error);
        }
      });
    }
  }

  editAmbulance(ambulance: Ambulance): void {
    // Placeholder for edit functionality
    alert(`Edit functionality for ambulance ${ambulance.plateNumber} would be implemented here`);
  }

  getStatusLabel(status: number): string {
    return getAmbulanceStatusLabel(status as AmbulanceStatus);
  }

  getTypeLabel(type: number): string {
    return getAmbulanceTypeLabel(type);
  }

  getStatusBadgeClass(status: number): string {
    return getAmbulanceStatusBadgeClass(status as AmbulanceStatus);
  }

  getDriverName(driverId: number): string {
    return this.dataService.getDriverName(driverId);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.pagination.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}


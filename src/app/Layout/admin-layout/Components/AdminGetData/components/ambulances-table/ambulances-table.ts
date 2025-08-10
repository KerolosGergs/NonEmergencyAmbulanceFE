import { ToastrService } from 'ngx-toastr';
import { response } from 'express';
import { AmbulanceService } from './../../../../../../Core/Services/Ambulance/ambulance-service';
import { AdminService } from './../../../../../../Core/Services/AdminServices/admin-service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ambulance, FilterOptions, PaginationInfo, AmbulanceStatus, getAmbulanceStatusLabel, getAmbulanceTypeLabel, getAmbulanceStatusBadgeClass } from '../../models/interfaces';
import { AmbulanceDto } from '../../../../../../Core/interface/Ambulance/iambulance';
import { EditAmbulanceModalComponent } from "./edit-ambulance-modal/edit-ambulance-modal";
import { IDriver } from '../../../../../../Core/interface/Driver/IDriver';
import { DriverService } from '../../../../../../Core/Services/Driver/driver';

@Component({
  selector: 'app-ambulances-table',
  standalone: true,
  imports: [CommonModule, FormsModule, EditAmbulanceModalComponent],
  templateUrl: './ambulances-table.html',
  styleUrl: './ambulances-table.css'
})
export class AmbulancesTableComponent implements OnInit {
  ambulances: Ambulance[] = [];
  drivers: IDriver[] = []; // Add a property to hold the list of drivers

  filteredAmbulances: Ambulance[] = [];
  loading = false;
  toastr = inject(ToastrService);
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

  isEditModalVisible = false;
  selectedAmbulance: Ambulance | null = null;

  constructor(private AdminService: AdminService, private ambulanceService: AmbulanceService, private driverService: DriverService) {}

  ngOnInit(): void {
    this.loadAmbulances();
    this.loadDrivers(); // Load drivers when the component initializes

  }

  loadAmbulances(): void {
    this.loading = true;
    this.AdminService.getAdminAmbulances().subscribe({
      next: (data) => {
        if(data.success){
          this.ambulances = data.data;
          this.applyFilters();

        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading ambulances:', error);
        this.loading = false;
      }
    });
  }

    loadDrivers(): void {
    this.driverService.getDrivers().subscribe({
      next: (response) => {
        if (response.success) {
          this.drivers = response.data;
        } else {
          this.toastr.error('Failed to load drivers.', 'Error');
        }
      },
      error: (err) => console.error('Error loading drivers:', err)
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
        this.ambulanceService.getAmbulanceById(ambulance.driverId).subscribe(driver => driver.data.driverName.toLowerCase().includes(searchTerm))
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
  const dto: AmbulanceDto = {
    plateNumber: ambulance.plateNumber,
    currentLocation: ambulance.currentLocation,
    status: newStatus, // Update status here
    type: ambulance.type,
    driverId: ambulance.driverId
  };

  this.ambulanceService.updateAmbulance(ambulance.ambulanceId, dto).subscribe({
    next: (response) => {
      if (response.success) {
        ambulance.status = newStatus;
        this.toastr.success('Status updated successfully!', 'Success');
      } else {
        this.toastr.error(response.message || 'Failed to update status.', 'Error');
      }
    },
    error: (error) => {
      console.error('Error updating ambulance status:', error);
      this.toastr.error('Error updating ambulance status.', 'Error');
    }
  });
}


  deleteAmbulance(ambulance: Ambulance): void {
    if (confirm(`Are you sure you want to delete ambulance ${ambulance.plateNumber}?`)) {
      this.ambulanceService.deleteAmbulance(ambulance.ambulanceId).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadAmbulances();
          }
        },
        error: (error) => {
          console.error('Error deleting ambulance:', error);
        }
      });
    }
  }

/**
   * Opens the edit modal with the selected ambulance's data.
   * @param ambulance The ambulance object to be edited.
   */
  editAmbulance(ambulance: Ambulance): void {
    this.selectedAmbulance = ambulance;
    this.isEditModalVisible = true;
  }

  /**
   * Handles the close event from the modal.
   * @param shouldRefresh Indicates whether the ambulance list should be reloaded.
   */
  handleModalClose(shouldRefresh: boolean): void {
    this.isEditModalVisible = false;
    this.selectedAmbulance = null;
    if (shouldRefresh) {
      this.loadAmbulances(); // Reload data to show changes
    }
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



  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.pagination.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}


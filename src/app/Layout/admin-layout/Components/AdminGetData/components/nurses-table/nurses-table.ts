import { response } from 'express';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  FilterOptions, PaginationInfo, getStatusBadgeClass } from '../../models/interfaces';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../../../../Core/Services/AdminServices/admin-service';
import { NurseService } from '../../../../../../Core/Services/NurseServise/nurse-service';
import { AdminNurse } from '../../../../../../Core/interface/Admin/iadmin';
import { EditNurseModalComponent } from "./edit-nurse-modal/edit-nurse-modal";

@Component({
  selector: 'app-nurses-table',
  standalone: true,
  imports: [CommonModule, FormsModule, EditNurseModalComponent],
  templateUrl: './nurses-table.html',
  styleUrl: './nurses-table.css'
})
export class NursesTableComponent implements OnInit {
  nurses: AdminNurse[] = [];
  filteredNurses: AdminNurse[] = [];
  loading = false;
  tostar = inject(ToastrService);
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

  // Properties to manage the edit modal
  isEditModalVisible = false;
  selectedNurse: AdminNurse | null = null;

  constructor(private NurseService: NurseService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadNurses();
  }

  loadNurses(): void {
    this.loading = true;
    this.adminService.getAdminNurses().subscribe({
      next: (data) => {
        if(data.success){
          this.nurses = data.data;
          this.applyFilters();

        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading nurses:', error);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.nurses];

    // Search filter
    if (this.filter.searchTerm) {
      const searchTerm = this.filter.searchTerm.toLowerCase();
      filtered = filtered.filter(nurse =>
        nurse.fullName.toLowerCase().includes(searchTerm) ||
        nurse.certification.toLowerCase().includes(searchTerm) ||
        nurse.phoneNumber.includes(searchTerm)
      );
    }

    // Availability filter
    if (this.filter.availabilityFilter !== 'all') {
      const isAvailable = this.filter.availabilityFilter === 'available';
      filtered = filtered.filter(nurse => nurse.isAvailable === isAvailable);
    }

    this.filteredNurses = filtered;
    this.updatePagination();
  }

  updatePagination(): void {
    this.pagination.totalItems = this.filteredNurses.length;
    this.pagination.totalPages = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);

    if (this.pagination.currentPage > this.pagination.totalPages) {
      this.pagination.currentPage = 1;
    }
  }

  getPaginatedNurses(): AdminNurse[] {
    const startIndex = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
    const endIndex = startIndex + this.pagination.itemsPerPage;
    return this.filteredNurses.slice(startIndex, endIndex);
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

  toggleAvailability(nurse: AdminNurse): void {
    this.NurseService.NurseAvailability(nurse.id, !nurse.isAvailable).subscribe({
      next: (response) => {
        if (response.success) {
          nurse.isAvailable = !nurse.isAvailable;
          this.tostar.success(response.message, 'Success');
        }

      },
      error: (error) => {
        this.tostar.error('Error updating nurse availability:', error);
      }
    });
  }

  deleteNurse(nurse: AdminNurse): void {
    if (confirm(`Are you sure you want to delete ${nurse.fullName}?`)) {
      this.NurseService.deleteNurse(nurse.id).subscribe({
        next: (success) => {

          this.loadNurses();
        },
        error: (error) => {
          console.error('Error deleting nurse:', error);
        }
      });
    }
  }

    // This method now opens the modal
  editNurse(nurse: AdminNurse): void {
    this.selectedNurse = nurse;
    this.isEditModalVisible = true;
  }

  // This method handles the closing of the modal
  handleCloseModal(wasUpdated: boolean): void {
    this.isEditModalVisible = false;
    this.selectedNurse = null;
    // If the data was updated in the modal, refresh the table to show changes
    if (wasUpdated) {
      this.loadNurses();
    }
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


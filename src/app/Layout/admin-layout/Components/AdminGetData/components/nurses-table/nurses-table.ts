import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Nurse, FilterOptions, PaginationInfo, getStatusBadgeClass } from '../../models/interfaces';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nurses-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nurses-table.html',
  styleUrl: './nurses-table.css'
})
export class NursesTableComponent implements OnInit {
  nurses: Nurse[] = [];
  filteredNurses: Nurse[] = [];
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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadNurses();
  }

  loadNurses(): void {
    this.loading = true;
    this.dataService.getNurses().subscribe({
      next: (data) => {
        this.nurses = data;
        this.applyFilters();
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

  getPaginatedNurses(): Nurse[] {
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

  toggleAvailability(nurse: Nurse): void {
    this.dataService.updateNurseAvailability(nurse.id, !nurse.isAvailable).subscribe({
      next: (success) => {
        if (success.isSuccessful) {
          nurse.isAvailable = !nurse.isAvailable;
          this.tostar.success(success.data);
        }

      },
      error: (error) => {
        this.tostar.error('Error updating nurse availability:', error);
      }
    });
  }

  deleteNurse(nurse: Nurse): void {
    if (confirm(`Are you sure you want to delete ${nurse.fullName}?`)) {
      this.dataService.deleteNurse(nurse.id).subscribe({
        next: (success) => {

          this.loadNurses();
        },
        error: (error) => {
          console.error('Error deleting nurse:', error);
        }
      });
    }
  }

  editNurse(nurse: Nurse): void {
    // Placeholder for edit functionality
    alert(`Edit functionality for ${nurse.fullName} would be implemented here`);
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


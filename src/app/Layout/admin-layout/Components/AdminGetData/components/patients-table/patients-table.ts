import { AdminService } from './../../../../../../Core/Services/AdminServices/admin-service';
import { AdminPatient } from './../../../../../../Core/interface/Admin/iadmin';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  FilterOptions, PaginationInfo, Gender, getGenderLabel } from '../../models/interfaces';
import { PatientService } from '../../../../../../Core/Services/PatientServise/patient-service';

@Component({
  selector: 'app-patients-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients-table.html',
  styleUrl: './patients-table.css'
})
export class PatientsTableComponent implements OnInit {
  patients: AdminPatient[] = [];
  filteredPatients: AdminPatient[] = [];
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

  constructor(private PatientService: PatientService,private AdminService: AdminService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.loading = true;
    this.AdminService.getAdminPatients().subscribe({
      next: (data) => {
        if(data.success)
        {
          this.patients = data.data;
          this.applyFilters();
        }
           this.loading = false;

      },
      error: (error) => {
        console.error('Error loading patients:', error);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.patients];

    // Search filter
    if (this.filter.searchTerm) {
      const searchTerm = this.filter.searchTerm.toLowerCase();
      filtered = filtered.filter(patient => 
        patient.fullName.toLowerCase().includes(searchTerm) ||
        patient.phoneNumber.includes(searchTerm) ||
        patient.address.toLowerCase().includes(searchTerm) ||
        patient.medicalHistory.toLowerCase().includes(searchTerm)
      );
    }

    this.filteredPatients = filtered;
    this.updatePagination();
  }

  updatePagination(): void {
    this.pagination.totalItems = this.filteredPatients.length;
    this.pagination.totalPages = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);
    
    if (this.pagination.currentPage > this.pagination.totalPages) {
      this.pagination.currentPage = 1;
    }
  }

  getPaginatedPatients(): AdminPatient[] {
    const startIndex = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
    const endIndex = startIndex + this.pagination.itemsPerPage;
    return this.filteredPatients.slice(startIndex, endIndex);
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

  deletePatient(patient: AdminPatient): void {
    if (confirm(`Are you sure you want to delete ${patient.fullName}?`)) {
      this.PatientService.deletePatient(patient.id).subscribe({
        next: (success) => {
          if (success) {
            this.loadPatients();
          }
        },
        error: (error) => {
          console.error('Error deleting patient:', error);
        }
      });
    }
  }

  editPatient(patient: AdminPatient): void {
    // Placeholder for edit functionality
    alert(`Edit functionality for ${patient.fullName} would be implemented here`);
  }

  viewPatientDetails(patient: AdminPatient): void {
    // Placeholder for view details functionality
    alert(`View details for ${patient.fullName} would be implemented here`);
  }

  getGenderLabel(gender: number): string {
    return getGenderLabel(gender as Gender);
  }

  getGenderIcon(gender: number): string {
    switch (gender as Gender) {
      case Gender.MALE:
        return 'bi-gender-male';
      case Gender.FEMALE:
        return 'bi-gender-female';
      default:
        return 'bi-gender-ambiguous';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  calculateAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.pagination.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}

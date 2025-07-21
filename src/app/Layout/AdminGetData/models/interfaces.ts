// Nurse interface
export interface Nurse {
  id: number;
  certification: string;
  isAvailable: boolean;
  phoneNumber: string;
  userId: string;
  fullName: string;
}

// Driver interface
export interface Driver {
  id: number;
  licenseNumber: string;
  phoneNumber: string;
  isAvailable: boolean;
  userId: string;
  userFullName: string;
}

// Ambulance interface
export interface Ambulance {
  plateNumber: string;
  currentLocation: string;
  status: number;
  type: number;
  driverId: number;
}

// Patient interface
export interface Patient {
  id: number;
  fullName: string;
  phoneNumber: string;
  address: string;
  medicalHistory: string;
  gender: number;
  dateOfBirth: string;
  userId: string;
}

// Data types for navigation
export type DataType = 'nurses' | 'drivers' | 'ambulances' | 'patients';

// Status options for ambulance
export enum AmbulanceStatus {
  AVAILABLE = 0,
  IN_USE = 1,
  MAINTENANCE = 2,
  OUT_OF_SERVICE = 3
}

// Type options for ambulance
export enum AmbulanceType {
  BASIC = 0,
  ADVANCED = 1,
  CRITICAL_CARE = 2,
  NEONATAL = 3
}

// Gender enum for patients
export enum Gender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2
}

// Filter interface
export interface FilterOptions {
  searchTerm: string;
  availabilityFilter: 'all' | 'available' | 'unavailable';
  statusFilter: 'all' | string;
}

// Pagination interface
export interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

// Helper functions for enum labels
export function getAmbulanceStatusLabel(status: AmbulanceStatus): string {
  switch (status) {
    case AmbulanceStatus.AVAILABLE:
      return 'Available';
    case AmbulanceStatus.IN_USE:
      return 'In Use';
    case AmbulanceStatus.MAINTENANCE:
      return 'Maintenance';
    case AmbulanceStatus.OUT_OF_SERVICE:
      return 'Out of Service';
    default:
      return 'Available';
  }
}

export function getAmbulanceTypeLabel(type: AmbulanceType): string {
  switch (type) {
    case AmbulanceType.BASIC:
      return 'Basic Life Support';
    case AmbulanceType.ADVANCED:
      return 'Advanced Life Support';
    case AmbulanceType.CRITICAL_CARE:
      return 'Critical Care Transport';
    case AmbulanceType.NEONATAL:
      return 'Neonatal Transport';
    default:
      return 'Basic Life Support';
  }
}

export function getGenderLabel(gender: Gender): string {
  switch (gender) {
    case Gender.MALE:
      return 'Male';
    case Gender.FEMALE:
      return 'Female';
    case Gender.OTHER:
      return 'Other';
    default:
      return 'Unknown';
  }
}

export function getStatusBadgeClass(isAvailable: boolean): string {
  return isAvailable ? 'badge bg-success status-available' : 'badge bg-danger status-unavailable';
}

export function getAmbulanceStatusBadgeClass(status: AmbulanceStatus): string {
  switch (status) {
    case AmbulanceStatus.AVAILABLE:
      return 'badge bg-success status-available';
    case AmbulanceStatus.IN_USE:
      return 'badge bg-primary';
    case AmbulanceStatus.MAINTENANCE:
      return 'badge bg-warning status-maintenance';
    case AmbulanceStatus.OUT_OF_SERVICE:
      return 'badge bg-danger status-unavailable';
    default:
      return 'badge bg-secondary';
  }
}



// Nurse interface
export interface Nurse {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  certification: string;
}

// Driver interface
export interface Driver {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  licenseNumber: string;
  isAvailable: boolean;
}
export interface DriverWithId  {
  id: number
  userFullName: string
}
export interface FromResponse {
  fullName: string
  email: string
  token: string
  displayName: string
  role: string
}

// Ambulance interface
export interface Ambulance {
  plateNumber: string;
  currentLocation: string;
  status: number;
  type: number;
  driverId: number;
}

// Form validation errors
export interface FormErrors {
  [key: string]: string;
}

// Form types for navigation
export type FormType = 'nurse' | 'driver' | 'ambulance';

// Status options for ambulance
export enum AmbulanceStatus {
  Available = 0,
  InService = 1,
  UnderMaintenance = 2,
}

// Type options for ambulance
export enum AmbulanceType {
  Regular = 0,
  EquippedWithNurse = 1,
 
}



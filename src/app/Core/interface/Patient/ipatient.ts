import { Patient } from './../../../Layout/admin-layout/Components/AdminGetData/models/interfaces';
  export interface IPatient {

    id: number
    fullName: string
    phoneNumber: string
    address: string
    medicalHistory: string
    gender: number
    dateOfBirth: string
    userId: string
  }



export interface PatientRequest {
  requestId: number;
  requestDate: string;  // ISO date string (e.g., "2025-08-24T12:00:00Z")
  pickupAddress: string;
  dropOffAddress: string;
  scheduledDate: string;  // ISO date string
  emergencyType: string;
  status: RequestStatus;
  notes: string;
  patientId: number;
  assignedAmbulanceId?: number;
  patientName?: string;
  patientPhone?: string;
  patientAddress?: string;
  patientImageUrl?: string;
  driverId?: number;
  driverName?: string;
  driverPhone?: string;
  driverImg?: string;
  ambulancePlateNumber?: string;
  ambulanceType?: string;

  // Nurse Info
  nurseId?: number;
  nurseName?: string;
  nursePhone?: string;
  nurseImg?: string;
}
export interface PatientTrip {
  tripId: number;
  startTime: string;        // ISO date string
  endTime: string;          // ISO date string
  pickupAddress: string;
  dropOffAddress: string;
  driverName: string;
  nurseName: string;
  distanceKM: number;
  price: number;
  tripStatus: TripStatus;   // Using the enum above
}

export enum RequestStatus {
  Pending = 0,
  Accepted = 1,
  Rejected = 2,
  InProgress = 3,
  Completed = 4,
  Cancelled = 5
}

export enum TripStatus {
  Pending = 0,
  Assigned = 1,
  Ongoing = 2,
  Completed = 3,
  Cancelled = 4,
  Failed = 5
}

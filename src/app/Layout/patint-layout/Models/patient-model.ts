export interface PatientRequest {
  requestId: number;
  requestDate: string;
  pickupAddress: string;
  dropOffAddress: string;
  scheduledDate: string;
  emergencyType: string;
  status: RequestStatus;
  notes: string;
  patientId: number;
  assignedAmbulanceId: number | null;
  patientName: string | null;
  patientPhone: string | null;
  patientAddress: string | null;
  patientImageUrl: string | null;
  driverId: number;
  driverName: string;
  driverPhone: string;
  driverImg: string;
  ambulancePlateNumber: string | null;
  ambulanceType: string | null;
  nurseId: number;
  nurseName: string;
  nursePhone: string;
  nurseImg: string;
}

export enum RequestStatus {
  Pending = 0,
  Confirmed = 1,
  Cancelled = 2,
  InProgress = 3,
  Completed = 4
}

export interface PatientInfo {
  patientId: number;
  patientName: string | null;
  patientPhone: string | null;
  patientAddress: string | null;
  patientImageUrl: string | null;
}

export interface DriverInfo {
  driverId: number;
  driverName: string;
  driverPhone: string;
  driverImg: string;
}

export interface NurseInfo {
  nurseId: number;
  nurseName: string;
  nursePhone: string;
  nurseImg: string;
}

export interface AmbulanceInfo {
  assignedAmbulanceId: number | null;
  ambulancePlateNumber: string | null;
  ambulanceType: string | null;
}


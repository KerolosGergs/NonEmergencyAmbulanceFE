export interface IRequest {
    requestId: number;
    requestDate: string; // ISO string
    pickupAddress: string;
    dropOffAddress: string;
    scheduledDate: string;
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
    ambulancePlateNumber?: string;
    ambulanceType?: string;
    nurseId?: number;
    nurseName?: string;
    nursePhone?: string;
     Price:Number;
}
export interface AssignUpdateRequest {
    requestId: number;
    status: RequestStatus;
    driverId?: number;
    nurseId?: number;
    patientName?: string;
    patientPhone?: string;
}
export interface UpdateRequestStatus {
    requestId: number;
    status: RequestStatus; // Corresponds to RequestStatus enum values
}
export interface IAssignDriver {
    requestId: number;
    DriverId: number;
}
export interface IAssignNurse
{
     RequestId :number
     NurseId :number
}
export interface IUpdateRequest {
  requestId: number;
  requestDate: string; // ISO string
  pickupAddress: string;
  dropOffAddress: string;
  scheduledDate: string;
  emergencyType: string;
}

export interface CreateRequest {
    pickupAddress: string;
    dropOffAddress: string;
    scheduledDate: string; // ISO date string
    emergencyType: string;
    notes: string;
}
export enum RequestStatus {
    Pending = 0,
    Accepted = 1,
    Rejected = 2,
    InProgress = 3,
    Completed = 4,
    Cancelled = 5
}


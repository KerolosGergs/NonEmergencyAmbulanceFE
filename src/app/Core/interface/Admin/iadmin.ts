export interface AdminDriver {
    id: number
    licenseNumber: string
    phoneNumber: string
    isAvailable: boolean
    userId: string
    userFullName: string
}

export interface AdminNurse {
    id: number
    certification: string
    isAvailable: boolean
    phoneNumber: string
    userId: string
    fullName: string
}

export interface AdminAmbulance {
    ambulanceId: number
    plateNumber: string
    currentLocation: string
    status: AmbulanceStatus
    type: AmbulanceType
    driverId: number
    driverName: string
}


export interface AdminPatient {
    id: number
    fullName: string
    phoneNumber: string
    address: string
    medicalHistory: string
    gender: number
    dateOfBirth: string
    userId: string
}

export interface AdminRequest {
    requestId: number
    requestDate: string
    pickupAddress: string
    dropOffAddress: string
    scheduledDate: string
    emergencyType: string
    status: RequestStatus
    notes: string
    patientId: number
    assignedAmbulanceId: any
    patientName: string
    patientPhone: string
    patientAddress: string
    patientImageUrl: any
    driverId: number
    driverName: string
    driverPhone: any
    ambulancePlateNumber: any
    ambulanceType: any
    nurseId: number
    nurseName: string
    nursePhone: any
    price: number
}
export interface AdminTrip {
    tripId: number;
    startTime: string;
    endTime: string;
    pickupAddress: string;
    dropOffAddress: string;
    driverName: string;
    nurseName: string;
    distanceKM: number;
    price: number;
    tripStatus: TripStatus;
}

enum AmbulanceStatus {
    Available = 0,
    InService = 1,
    UnderMaintenance = 2,
}
enum AmbulanceType {
    Regular = 0,
    EquippedWithNurse = 1
}
enum RequestStatus {
    Pending = 0,
    Accepted = 1,
    Rejected = 2,
    InProgress = 3,
    Completed = 4,
    Cancelled = 5
}
enum TripStatus {
    Pending = 0,
    Assigned = 1,
    Ongoing = 2,
    Completed = 3,
    Cancelled = 4,
    Failed = 5
}
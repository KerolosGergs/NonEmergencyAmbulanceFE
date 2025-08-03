export interface EmergencyRequest {
  pickupAddress: string;
  dropOffAddress: string;
  scheduledDate: string;
  emergencyType: string;
  notes: string;
}

export interface LocationPoint {
  lat: number;
  lng: number;
  address: string;
}

export interface EmergencyApiResponse {
  success: boolean;
  message: string;
  id?: string;
}
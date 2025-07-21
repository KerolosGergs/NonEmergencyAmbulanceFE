export interface IBooking {
  requestId: number
  requestDate: string
  pickupAddress: string
  dropOffAddress: string
  scheduledDate: string
  emergencyType: string
  status: number
  notes: string
  patientId: number
  assignedAmbulanceId: any
  patientName: string
  patientPhone: string
  patientAddress: string
  patientImageUrl: any
  driverId: any
  driverName: any
  driverPhone: any
  ambulancePlateNumber: any
  ambulanceType: any
  nurseId: any
  nurseName: any
  nursePhone: any
}
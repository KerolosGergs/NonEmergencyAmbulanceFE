export interface IAmbulance {
  ambulanceId: number
  plateNumber: string
  currentLocation: string
  status: number
  type: number
  driverId: number
  driverName: string
}
export interface AmbulanceDto {
  plateNumber: string
  currentLocation: string
  status: number
  type: number
  driverId: number
}

import { Driver } from './../../../Layout/admin-layout/Components/AdminGetData/models/interfaces';
export interface IDriver {
  id: number
  licenseNumber: string
  phoneNumber: string
  isAvailable: boolean
  userId: string
  userFullName: string
}
export interface IDriverRegister {
  email: string
  password: string
  fullName: string
  phoneNumber: string
  licenseNumber: string
  isAvailable: boolean
}

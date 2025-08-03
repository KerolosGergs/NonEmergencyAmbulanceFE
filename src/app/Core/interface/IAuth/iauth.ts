export interface NurseRegister {
  email: string
  password: string
  fullName: string
  phoneNumber: string
  certification: string
}
export interface DriverRegister {
  email: string
  password: string
  fullName: string
  phoneNumber: string
  licenseNumber: string
  isAvailable: boolean
}

export interface PatientRegister {
  email: string
  password: string
  fullName: string
  phoneNumber: string
  address: string
  medicalHistory: string
  gender: number
  dateOfBirth: string
}

export interface ILogin {
    email: string;
    password: string;
}

export interface  IUser
 {
     FullName :string;
      Email :string;
      Token :string;
      DisplayName:string; 
     Role :string;
 }
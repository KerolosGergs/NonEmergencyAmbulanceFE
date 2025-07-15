

export interface IRequest {
  email: string
  password: string
  fullName: string
  phoneNumber: string
  address: string
  medicalHistory: string
  gender: number
  dateOfBirth: string
}


export interface IRegisterResponse {
  success: boolean
  message: string
  data: register
}

export interface register {
  fullName: string
  email: string
  token: string
  displayName: string
  role: string
}

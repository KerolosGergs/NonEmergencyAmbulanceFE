export interface INurse {

  id: number
  certification: string
  isAvailable: boolean
  phoneNumber: string
  userId: string
  fullName: string
}
export interface INurseRegister {
  email: string
  password: string
  fullName: string
  phoneNumber: string
  certification: string
}

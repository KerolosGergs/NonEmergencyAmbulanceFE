export interface ILogin {
    email: string;
    password: string;
}
export interface ILoginResponse {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  fullName: string
  email: string
  token: string
  displayName: string
  role: string
}

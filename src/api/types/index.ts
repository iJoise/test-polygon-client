import {IUser, Nullable} from "../../types";

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: IUser
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegistrationPayload extends LoginPayload {
  name: string
  surname: string
  phone: string
}
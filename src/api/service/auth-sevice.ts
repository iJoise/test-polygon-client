import {AxiosResponse} from "axios";
import {AuthResponse, LoginPayload, RegistrationPayload} from "../types";
import {$api} from "../api-config";


export class AuthService {
  static async login(payload: LoginPayload): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', payload)
  }

  static async registration(payload: RegistrationPayload): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', payload)
  }

  static async logout(): Promise<void> {
    return $api.post('/logout')
  }

}
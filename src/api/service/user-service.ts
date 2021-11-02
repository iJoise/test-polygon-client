import {AxiosResponse} from "axios";
import {$api} from "../api-config";
import {IUser} from "../../types";


export class UserService {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users', )
  }
}
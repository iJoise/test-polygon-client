import {AxiosResponse} from "axios";
import {daData} from "../api-config";
import {Dadata} from "../types/dadata-types";


export class DadataService {
  static async fetchCity(data: Dadata.DadataAddrRequest): Promise<AxiosResponse<Dadata.DadataAddrResponse>> {
    return await daData.post('suggest/address', data)
  }
}
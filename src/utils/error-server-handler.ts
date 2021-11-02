import {AxiosError} from "axios";


export const isAxiosError = (candidate: any): candidate is AxiosError => {
  return candidate.isAxiosError === true;
}
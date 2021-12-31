import {Nullable} from "../../types";


export type SearchType = 'city' | 'street' | 'house' | 'flat'

export type DadataInitialStateType = {
  kladrCity: Nullable<string>
  kladrStreet: Nullable<string>
  kladrHouse: Nullable<string>
}

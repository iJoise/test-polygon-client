import {Nullable, OptionsItem} from "../../types";

export type PayloadAddressType = {
  query: string
  type: SearchType
}

export type SearchType = 'city' | 'street' | 'house' | 'flat'

export type DadataInitialStateType = {
  kladr: Nullable<string>
  cityList: OptionsItem[]
  streetList: OptionsItem[]
}

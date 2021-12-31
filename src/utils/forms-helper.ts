import {Dispatch} from "@reduxjs/toolkit";
import {handleAppError} from "../store/appSlice/appSlice";
import {DadataInitialStateType, SearchType} from "../store/dadataSlice/dadata-slice-types";
import {Dadata} from "../api/types/dadata-types";
import {OptionsItem} from "../types";

export enum ErrorMessage {
  REQUIRED = 'Заполните все необходимые поля'
}

export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms))

export const checkFocusError = async (focusRef: any, setFocus: (value: boolean) => void, focus: boolean, dispatch: Dispatch<any>) => {
  await sleep(100)
  if (focusRef.current && focus) {
    const input: HTMLInputElement[] = focusRef.current.querySelectorAll('input')
    for (let i = 0; i < input.length; i++) {
      let el = input[i]
      if (el.hasAttribute('data-error') || el.hasAttribute('aria-errormessage')) {
        el.focus()
        dispatch(handleAppError(ErrorMessage.REQUIRED))
        setFocus(false)
        return
      }
    }
  }
}

export const normalizedSubmitData = (data: { [value: string]: string }) => {
  const result: any = {}
  for (let key in data) {
    let newKey = data[key]
    let newValue = key.replace(/[0-9]/g, '')
    result[newValue] = newKey
  }
  return result
}

export const createAddressPayload = (type: SearchType, query: string, kladr: DadataInitialStateType): Dadata.DadataAddrRequest => {
  const payload: Dadata.DadataAddrRequest = {
    query,
    from_bound: {value: 'city'},
    to_bound: {value: 'settlement'},
    locations: [{kladr_id: ''}],
    count: 20,
    restrict_value: false
  }
  switch (type) {
    case "city":
      return {
        ...payload,
      }
    case "street":
      return {
        ...payload,
        to_bound: {value: 'street'},
        from_bound: {value: 'street'},
        locations: [{kladr_id: `${kladr.kladrCity}`}],
        restrict_value: false
      }
    case "house":
      return {
        ...payload,
        to_bound: {value: 'house'},
        from_bound: {value: 'house'},
        locations: [{kladr_id: `${kladr.kladrStreet ? kladr.kladrStreet : kladr.kladrCity}`}],
      }
    default:
      return {
        ...payload
      }
  }
}

export const normalizedDadataCityResponse = ({suggestions}: Dadata.DadataAddrResponse): OptionsItem[] => {
  const options: OptionsItem[] = []
  suggestions.forEach((el,) => {
    if (el.data.city && el.data.settlement && el.data.settlement_type_full === 'микрорайон') {
      options.push({
        value: el.value,
        label: el.value,
        placement: el.data.kladr_id
      })
    } else if (el.data.city) {
      options.push({
        value: `${el.data.city_type_full} ${el.data.city}`,
        label: `${el.data.city_type_full} ${el.data.city}, ${el.data.region_with_type}`,
        placement: el.data.kladr_id
      })
    } else if (el.data.settlement) {
      options.push({
        value: el.data.settlement_with_type || '',
        label: `${el.data.settlement_with_type}, ${el.data.region_with_type}` || '',
        placement: el.data.kladr_id
      })
    }
  })
  return options
}
export const normalizedDadataStreetResponse = ({suggestions}: Dadata.DadataAddrResponse): OptionsItem[] => {
  const options: OptionsItem[] = []
  suggestions.forEach((el,) => {
    options.push({
      value: `${el.data.street_type_full} ${el.data.street}`,
      label: `${el.data.street_type_full} ${el.data.street}`,
      placement: el.data.kladr_id,
    })
  })
  return options
}

export const normalizedDadataHouseResponse = ({suggestions}: Dadata.DadataAddrResponse): OptionsItem[] => {
  const options: OptionsItem[] = []
  suggestions.forEach((el,) => {
    options.push({
      value: `${el.data.house_type_full} ${el.data.house}`,
      label: `${el.data.house_type_full} ${el.data.house}`,
      placement: el.data.kladr_id
    })
  })
  return options
}

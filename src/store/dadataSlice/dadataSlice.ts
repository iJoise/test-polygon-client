import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, AppRootStateType} from "../store";
import {handleAppError} from "../appSlice/appSlice";
import {isAxiosError} from "../../utils/error-server-handler";
import {DadataService} from "../../api/service/dadata-service";
import {DadataInitialStateType, PayloadAddressType} from "./dadata-slice-types";
import {
  createAddressPayload,
  normalizedDadataCityResponse,
  normalizedDadataStreetResponse
} from "../../utils/forms-helper";
import {OptionsItem} from "../../types";


export const getAddress = createAsyncThunk(
  'dadata/address',
  async (payload: PayloadAddressType, thunkAPI) => {
    const dispatch = thunkAPI.dispatch as AppDispatch
    const state = thunkAPI.getState() as AppRootStateType
    const kladr = state.dadata.kladr
    try {
      const data = createAddressPayload(payload.type, payload.query, !!kladr ? kladr : '')
      const response = await DadataService.fetchCity(data)
      switch (payload.type) {
        case "city":
          const optionsCity = normalizedDadataCityResponse(response.data)
          dispatch(setAddressList(optionsCity))
          break
        case "street":
          const optionStreet = normalizedDadataStreetResponse(response.data)
          dispatch(setStreetList(optionStreet))
      }
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(handleAppError(err.response?.data.message))
      }
    }
  }
)


const dadataInitialState: DadataInitialStateType = {
  kladr: null,
  cityList: [] as OptionsItem[],
  streetList: [] as OptionsItem[]
}

const dadataSlice = createSlice({
  name: 'dadata',
  initialState: dadataInitialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.kladr = action.payload
    },
    setAddressList: (state, action: PayloadAction<OptionsItem[]>) => {
      state.cityList = action.payload
    },
    setStreetList: (state, action: PayloadAction<OptionsItem[]>) => {
      state.streetList = action.payload
    },
  }
})

export const dadataReducer = dadataSlice.reducer
export const {setAddressList, setCity, setStreetList} = dadataSlice.actions
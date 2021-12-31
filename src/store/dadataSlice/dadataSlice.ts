import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DadataInitialStateType} from "./dadata-slice-types";


const dadataInitialState: DadataInitialStateType = {
  kladrCity: null,
  kladrStreet: null,
  kladrHouse: null,
}

const dadataSlice = createSlice({
  name: 'dadata',
  initialState: dadataInitialState,
  reducers: {
    setKladrCity: (state, action: PayloadAction<string>) => {
      state.kladrCity = action.payload
    },
    setKladrStreet: (state, action: PayloadAction<string>) => {
      state.kladrStreet = action.payload
    },
    setKladrHouse: (state, action: PayloadAction<string>) => {
      state.kladrHouse = action.payload
    },
  }
})

export const dadataReducer = dadataSlice.reducer
export const {setKladrCity, setKladrStreet, setKladrHouse} = dadataSlice.actions
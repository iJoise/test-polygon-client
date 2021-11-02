import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CreditFormType, CreditParameterInfoType, StepType} from "./credit-form-types";


const creditFormInitialState: CreditFormType = {
  step: 'credit_parameter_info',
  credit_parameter_info: {
    product: 'credit_card',
    name: null,
    surname: null,
    patronymic: null,
    gender: null
  }
}

const creditFormSlice = createSlice({
  name: 'credit-form',
  initialState: creditFormInitialState,
  reducers: {
    setStep: (state, action: PayloadAction<StepType>) => {
      state.step = action.payload
    },
    setCreditInfo: (state, action: PayloadAction<CreditParameterInfoType>) => {
      state.credit_parameter_info = action.payload
    }
  }
})

export const creditReducer = creditFormSlice.reducer
export const {setCreditInfo, setStep} = creditFormSlice.actions
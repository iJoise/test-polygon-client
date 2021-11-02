import {Nullable} from "../../types";

export type CreditFormType = {
  step: StepType
  credit_parameter_info: CreditParameterInfoType
}

export type CreditParameterInfoType = {
  product: ProductType
  name: Nullable<string>
  surname: Nullable<string>
  patronymic: Nullable<string>
  gender: Nullable<GenderType>
}

export type ProductType = 'credit_card' | 'credit_cash' | 'installment_card'
type GenderType = 'male' | 'female'

export type StepType = 'credit_parameter_info' | 'work_info' | 'additional_info' | 'passport_info'

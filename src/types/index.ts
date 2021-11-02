export interface IUser {
  name: string
  surname: string
  email: string
  phone: number
  isActivated: boolean
}

export declare type Nullable<T> = T | null

export type OptionsItem = {
  value: string
  label: string
  placement?: Nullable<string>  | undefined
}

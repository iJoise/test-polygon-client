import React, {DetailedHTMLProps, InputHTMLAttributes} from "react";
import s from "./InputField.module.scss";
import {ConfirmIcon} from "../../assets/icon/ConfirmIcon";
import {ErrorIcon} from "../../assets/icon/ErrorIcon";
import InputMask from 'react-input-mask';


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputFieldPropsType = DefaultInputPropsType & {
  touched: boolean | undefined
  error?: string
  label?: string
  value: string
  type?: string
  mask?: string
  innerRef?: any
}


export const InputField: React.FC<InputFieldPropsType> = React.memo((
  {
    error,
    className,
    label,
    touched,
    value,
    type = 'text',
    mask,
    ref,
    innerRef,
    ...restProps
  }
) => {
  const checkField = () => touched && !error && value.length
  const errorClassName = `${s.error}`
  const inputClassName =
    `${s.input} ${className ? s.input__class : ''} 
     ${error ? className ? s.input__error_class : s.input__error : ''} ${mask ? s.input__mask : ''} 
     ${checkField() ? className ? s.input__confirm_class : s.input__confirm : ''}`
  const labelClassName = `${s.label} ${checkField() ? s.label__confirm : ''}`


  return (
    <div className={`${s.inputField}`}>
      <label className={labelClassName}>{label}</label>
      {!mask ? (
        <input
          role="presentation"
          ref={innerRef}
          autoComplete="{something}"
          className={inputClassName}
          value={value}
          type={type}
          data-error={error}
          {...restProps}
        />
      ) : (
        <InputMask
          role="presentation"
          autoComplete="{something}"
          mask={mask}
          value={value}
          className={inputClassName}
          type={type}
          data-error={error}
          {...restProps}
        />
      )}
      <div className={className ? s.inputField__confirm_class : s.inputField__confirm}>
        {checkField() && <ConfirmIcon/>}
        {error && <ErrorIcon/>}
      </div>
      <div className={s.inputField__error}>
        {error && <span className={errorClassName}>{error}</span>}
      </div>
    </div>
  )
})

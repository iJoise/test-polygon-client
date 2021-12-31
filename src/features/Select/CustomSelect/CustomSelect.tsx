import React, {FocusEvent, useMemo} from 'react';
import Select, {Options, PropsValue} from 'react-select';
import s from "../CustomSelect.module.scss";
import {customStyles, DropdownIndicator, MenuList} from "../custom-styles";
import {OptionsItem} from "../../../types";
import {FieldProps} from "formik";
import {sleep} from "../../../utils/forms-helper";

interface CustomSelectProps extends FieldProps {
  options: Options<OptionsItem>;
  className?: string;
  placeholder?: string;
  label: string
  error: string
  touched: boolean
  state?: string
  setState?: (value: string) => void
}

export const CustomSelect = React.memo((
  {
    placeholder,
    field,
    form,
    options,
    label,
    error,
    touched,
    state,
    setState
  }: CustomSelectProps) => {

  const checkField = () => touched && !error && field.value
  const labelClassName = `${s.label} ${checkField() ? s.label__confirm : ''}`
  const selectClassName = `${s.item} ${error ? s.item__error : ''}`

  const onChange = (option: PropsValue<OptionsItem | OptionsItem[]>) => {
    form.setFieldValue(field.name, (option as OptionsItem).value);
    field.name === state && setState && setState((option as OptionsItem).value)
  }

  const onBlurHandler = async (e: FocusEvent) => {
    e.preventDefault()
    await sleep(100)
    form.setFieldTouched(field.name)
  }

  const getValue = useMemo(() => {
    if (options) {
      return  options.find(option => option.value === field.value);
    } else {
      return ("" as any);
    }
  }, [field.value, options]);

  return (
    <div className={s.select}>
      <label className={labelClassName}>
        {label}<span>*</span>
      </label>
      <Select
        className={selectClassName}
        value={getValue}
        name={field.name}
        styles={customStyles}
        onChange={onChange}
        onBlur={onBlurHandler}
        options={options}
        aria-errormessage={error}
        isSearchable={false}
        openMenuOnFocus
        placeholder={placeholder}
        components={{MenuList, DropdownIndicator}}
      />
      <div className={s.select__error}>
        {error && <span className={s.error}>{error}</span>}
      </div>
    </div>
  )
});
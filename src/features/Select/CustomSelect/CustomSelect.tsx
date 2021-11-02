import React, {useCallback, useMemo} from 'react';
import Select, {components, DropdownIndicatorProps, MenuListProps, Options, PropsValue} from 'react-select';
import {ConfirmIcon} from "../../../assets/icon/ConfirmIcon";
import s from "../CustomSelect.module.scss";
import {ErrorIcon} from "../../../assets/icon/ErrorIcon";
import {customStyles, menuHeaderStyle} from "../custom-styles";
import {OptionsItem} from "../../../types";
import {FieldProps} from "formik";

const MenuList = (props: MenuListProps) => {
  return (
    <components.MenuList {...props}>
      <div style={menuHeaderStyle}>Выберите вариант из выпадающего списка</div>
      {props.children}
    </components.MenuList>
  );
};
const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      {props.hasValue && <ConfirmIcon/>}
      {props.selectProps["aria-errormessage"] && <ErrorIcon/>}
    </components.DropdownIndicator>
  );
};

interface CustomSelectProps extends FieldProps {
  options: Options<OptionsItem>;
  isMulti?: boolean;
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
    isMulti = false,
    state,
    setState
  }: CustomSelectProps) => {

  const checkField = () => touched && !error && field.value
  const labelClassName = `${s.label} ${checkField() ? s.label__confirm : ''}`
  const selectClassName = `${s.item} ${error ? s.item__error : ''}`

  const onChange = useCallback((option: PropsValue<OptionsItem | OptionsItem[]>) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as OptionsItem[]).map((item: OptionsItem) => item.value)
        : (option as OptionsItem).value
    );
    field.name === state && setState && setState((option as OptionsItem).value)
  }, [field.name, form, isMulti, setState, state]);

  const onBlurHandler = useCallback(() => {
    form.setFieldTouched(field.name)
  },[field, form])

  const getValue = useMemo(() => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  }, [field.value, options, isMulti]);

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
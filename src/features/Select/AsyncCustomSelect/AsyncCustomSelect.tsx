import React, {useCallback} from 'react';
import {
  ActionMeta,
  components,
  DropdownIndicatorProps,
  GroupBase,
  MenuListProps,
  Options,
  OptionsOrGroups
} from 'react-select';
import {ConfirmIcon} from "../../../assets/icon/ConfirmIcon";
import s from "../CustomSelect.module.scss";
import {ErrorIcon} from "../../../assets/icon/ErrorIcon";
import {customStyles, menuHeaderStyle} from "../custom-styles";
import {OptionsItem} from "../../../types";
import {FieldProps} from "formik";
import AsyncSelect from "react-select/async";
import {useAppDispatch, useAppSelector} from "../../../hook/appHooks";
import {getAddress, setCity} from "../../../store/dadataSlice/dadataSlice";
import {useDebounce} from "../../../hook/useDebounce";

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

interface AsyncCustomSelectProps extends FieldProps {
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

export const AsyncCustomSelect = React.memo((
  {
    placeholder,
    field,
    form,
    label,
    error,
    touched,
  }: AsyncCustomSelectProps) => {

  const checkField = () => touched && !error && field.value
  const labelClassName = `${s.label} ${checkField() ? s.label__confirm : ''}`
  const selectClassName = `${s.item} ${error ? s.item__error : ''}`
  const dispatch = useAppDispatch()
  const addressOptions = useAppSelector(state => state.dadata.cityList)
  const streetOptions = useAppSelector(state => state.dadata.streetList)

  const loadOptions = async (value: string, callback: (options: OptionsOrGroups<unknown, GroupBase<unknown>>) => void) => {
    console.log(value)
    switch (field.name) {
      case 'city': {
        dispatch(setCity(''))
        await dispatch(getAddress({query: value, type: 'city'}))
        console.log(addressOptions  )
        return callback(addressOptions)
      }
      case 'street': {
        await dispatch(getAddress({query: value, type: 'street'}))
        return callback(streetOptions)
      }
    }
  }

  const debounce = useDebounce(loadOptions, 500)

  const onChange = (newValue: any, {action}: ActionMeta<unknown>) => {
    if (newValue && newValue.value) {
      form.setFieldValue(field.name, newValue.value)
      dispatch(setCity(newValue.placement))

      if (action === 'clear' || action === 'pop-value') {
        form.setFieldValue(field.name, '')
      }
    }
  }

  const onBlurHandler = useCallback(() => {
    form.setFieldTouched(field.name)
  }, [field, form])

  return (
    <div className={s.select}>
      <label className={labelClassName}>
        {label}<span>*</span>
      </label>
      <AsyncSelect
        className={selectClassName}
        name={field.name}
        styles={customStyles}
        loadOptions={debounce}
        onBlur={onBlurHandler}
        onChange={onChange}
        backspaceRemovesValue={true}
        isClearable
        openMenuOnFocus
        aria-errormessage={error}
        placeholder={placeholder}
        components={{MenuList, DropdownIndicator}}
      />
      <div className={s.select__error}>
        {error && <span className={s.error}>{error}</span>}
      </div>
    </div>
  )
});
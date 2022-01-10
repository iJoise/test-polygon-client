import React, {FocusEvent, useEffect, useRef} from 'react';
import {ActionMeta, GroupBase, Options, OptionsOrGroups} from 'react-select';
import s from "../CustomSelect.module.scss";
import {OptionsItem} from "../../../types";
import {FieldProps} from "formik";
import AsyncSelect from "react-select/async";
import {useDebounce} from "../../../hook/useDebounce";
import {
  createAddressPayload,
  normalizedDadataCityResponse,
  normalizedDadataHouseResponse,
  normalizedDadataStreetResponse, sleep
} from "../../../utils/forms-helper";
import {DadataService} from "../../../api/service/dadata-service";
import {SearchType} from "../../../store/dadataSlice/dadata-slice-types";
import {useAppDispatch, useAppSelector} from "../../../hook/appHooks";
import {setKladrCity, setKladrHouse, setKladrStreet} from "../../../store/dadataSlice/dadataSlice";
import {kladrSelector} from "../../../store/dadataSlice/selectors";
import {customStyles, DropdownIndicator, MenuList} from "../custom-styles";
import Select from "react-select/base";

interface AsyncCustomSelectProps extends FieldProps {
  options: Options<OptionsItem>;
  className?: string;
  placeholder?: string;
  label: string
  error?: string
  touched?: boolean
}

export const AsyncCustomSelect = React.memo((
  {
    placeholder,
    field,
    form,
    label,
    error,
    touched
  }: AsyncCustomSelectProps) => {

  const checkField = () => touched && !error && field.value
  const labelClassName = `${s.label} ${checkField() ? s.label__confirm : ''}`
  const selectClassName = `${s.item} ${error ? s.item__error : ''}`
  const kladr = useAppSelector(kladrSelector)
  const dispatch = useAppDispatch()
  const selectRef = useRef<Select<unknown, boolean, GroupBase<unknown>>>(null)

  const loadOptions = async (value: string, callback: (options: OptionsOrGroups<unknown, GroupBase<unknown>>) => void) => {
    const data = createAddressPayload(field.name as SearchType, value, kladr)
    const response = await DadataService.fetchAddress(data)
    switch (field.name) {
      case 'city': {
        const optionsCity = normalizedDadataCityResponse(response.data)
        return callback(optionsCity)
      }
      case 'street': {
        const optionStreet = normalizedDadataStreetResponse(response.data)
        return callback(optionStreet)
      }
      case 'house': {
        const optionHouse = normalizedDadataHouseResponse(response.data)
        return callback(optionHouse)
      }
    }
  }

  const debounce = useDebounce(loadOptions, 500)

  const onChange = (newValue: any, {action}: ActionMeta<unknown>) => {
    if (action === 'clear' || action === 'pop-value') {
      form.setFieldValue(field.name, '')
      switch (field.name) {
        case 'city':
          dispatch(setKladrCity(''))
          break
        case 'street':
          dispatch(setKladrStreet(''))
          break
        case 'house':
          dispatch(setKladrHouse(''))
          break
      }
    }
    if (newValue && newValue.value) {
      form.setFieldValue(field.name, newValue.value)
      switch (field.name) {
        case 'city':
          dispatch(setKladrCity(newValue.placement))
          break
        case 'street':
          dispatch(setKladrStreet(newValue.placement))
          break
        case 'house':
          dispatch(setKladrHouse(newValue.placement))
          break
      }
    }
  }

  const onBlurHandler = async (e: FocusEvent) => {
    e.preventDefault()
    await sleep(100)
    form.setFieldTouched(field.name)
  }

  useEffect(() => {
    if (error && field.name) {
      form.setFieldValue(field.name, '')
      selectRef.current?.clearValue()
    }
    //eslint-disable-next-line
  }, [error])

  return (
    <div className={s.select}>
      <label className={labelClassName}>
        {label}<span>*</span>
      </label>
      <AsyncSelect
        ref={selectRef}
        className={selectClassName}
        name={field.name}
        styles={customStyles}
        loadOptions={debounce}
        onBlur={onBlurHandler}
        onChange={onChange}
        cacheOptions
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

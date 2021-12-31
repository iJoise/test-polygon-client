import {components, DropdownIndicatorProps, MenuListProps, StylesConfig} from "react-select";
import {ConfirmIcon} from "../../assets/icon/ConfirmIcon";
import {ErrorIcon} from "../../assets/icon/ErrorIcon";
import React from "react";

export const MenuList = (props: MenuListProps) => {
  return (
    <components.MenuList {...props}>
      <div style={menuHeaderStyle}>Выберите вариант из выпадающего списка</div>
      {props.children}
    </components.MenuList>
  );
};
export const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      {props.hasValue && !props.selectProps["aria-errormessage"] && <ConfirmIcon/>}
      {props.selectProps["aria-errormessage"] && <ErrorIcon/>}
    </components.DropdownIndicator>
  );
};

export const menuHeaderStyle = {
  padding: '10px 12px',
  height: '100%',
  borderTopLeftRadius: '3px',
  borderTopRightRadius: '3px',
  background: '#3D405B',
  fontSize: '14px',
  color: 'white',
};

const color = '#81B29A'
const alpha = 'rgba(129,178,154,0.30)'
export const customStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: state.selectProps["aria-errormessage"]
      ? '#F5E8E9'
      : state.hasValue
        ? alpha
        : base.backgroundColor,
    boxShadow: state.isFocused ? '0' : '0',
    borderColor: state.isFocused
      ? '#666'
      : base.borderColor,
    '&:hover': {
      borderColor: state.isFocused
        ? '#666'
        : base.borderColor,
    }
  }),
  menuList: (base, state) => ({
    ...base,
    paddingTop: '0',
    paddingBottom: '0',
    marginTop: '-9px',
  }),
  option: (base, {isSelected, isFocused}) => {

    return {
      ...base,
      backgroundColor: isSelected
        ? color
        : isFocused
          ? alpha
          : undefined,
      ':active': {
        ...base[':active'],
        backgroundColor: '#81B29A',
      },
    }
  },
  indicatorSeparator: (base) => ({
    ...base,
    display: "none"
  })
};
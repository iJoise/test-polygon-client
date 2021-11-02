import React from "react";
import s from "./Header.module.scss";
import {logoutTS} from "../../store/authSlice/authSlice";
import {useAppDispatch, useAppSelector} from "../../hook/appHooks";
import { NavLink } from "react-router-dom";
import {PATH} from "../../constants/constants";



export const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const userName = useAppSelector(state => state.auth.user.name)
  const step = useAppSelector(state => state.credit.credit_parameter_info.product)


  return (
    <header className={s.header}>
      <div>header</div>
      <button onClick={() => dispatch(logoutTS())}>Выйти</button>
      <h3>{userName}</h3>
      <nav className={s.nav}>
        <NavLink to={`${PATH.FORM}/${step}`}>Form</NavLink>
      </nav>
    </header>
  )
}

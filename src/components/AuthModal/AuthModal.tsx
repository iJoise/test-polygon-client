import React from "react";
import style from "./AuthModal.module.scss";
import {H2} from "../Headings/H2";
import {useHistory} from "react-router-dom";

type AuthModalPropsType = {
  subtitle: string
  goBack?: boolean
}


export const AuthModal: React.FC<AuthModalPropsType> = React.memo((props) => {
  const {children, subtitle, goBack} = props
  const history = useHistory()

  return (
    <div className={style.container}>
      <div className={style.container__body}>
        {goBack && <button className={style.btn} onClick={() => history.goBack()}>&#10232;</button>}
        <H2>{subtitle}</H2>
        {children}
      </div>
    </div>
  )
})

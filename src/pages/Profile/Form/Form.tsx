import React from "react";
import {CreditInfo} from "./CreditInfo/CreditInfo";
import {useAppSelector} from "../../../hook/appHooks";
import {Route, Switch} from "react-router-dom";
import {PATH} from "../../../constants/constants";
import {WorkInfo} from "./WorkInfo/WorkInfo";

type FormPropsType = {}


export const Form: React.FC<FormPropsType> = React.memo(() => {
  const step = useAppSelector(state => state.credit.credit_parameter_info.product)

  return (
    <>
      <Switch>
        <Route path={`${PATH.FORM}/${step}`} render={() => <CreditInfo/>}/>
        <Route path={`${PATH.FORM}/workinfo`} render={() => <WorkInfo/>}/>
      </Switch>
    </>
  )
})

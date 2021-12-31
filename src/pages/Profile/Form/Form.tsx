import React from "react";
import {CreditInfo} from "./CreditInfo/CreditInfo";
import {useAppSelector} from "../../../hook/appHooks";
import {Route, Switch} from "react-router-dom";
import {PATH} from "../../../constants/constants";
import {WorkInfo} from "./WorkInfo/WorkInfo";
import {useTimer} from "../../../hook/useTimer";

type FormPropsType = {}


export const Form: React.FC<FormPropsType> = React.memo(() => {
  const step = useAppSelector(state => state.credit.credit_parameter_info.product)
  const {time, isActive, stopTimer, runTimer} = useTimer()

  return (
    <>
      <div>{time.minute}:{time.seconds}</div>
      <button onClick={() => runTimer(!isActive)}>{isActive ? 'pause' : 'start'}</button>
      <button onClick={stopTimer}>stop</button>
      <Switch>
        <Route path={`${PATH.FORM}/${step}`} render={() => <CreditInfo/>}/>
        <Route path={`${PATH.FORM}/workinfo`} render={() => <WorkInfo/>}/>
      </Switch>
    </>
  )
})

import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {PATH} from "../../constants/constants";
import {useAppSelector} from "../../hook/appHooks";
import {Form} from "./Form/Form";
import com from '../../style/common.module.scss'
import {Pooling} from "../../components/Pooling/Pooling";


export const Profile: React.FC = React.memo(() => {
  const {isAuth} = useAppSelector(state => state.auth)


  if (!isAuth) return <Redirect to={PATH.LOGIN}/>

  return (
    <div className={com.profile_container}>
      <Pooling/>
      <Switch>
        <Route path={`${PATH.FORM}`} render={() => <Form/>}/>
      </Switch>
    </div>
  )
})

import React from "react";
import {Route, Switch} from "react-router-dom";
import {PATH} from "../../constants/constants";
// import {useAppSelector} from "../../hook/appHooks";
import {Form} from "./Form/Form";
import com from '../../style/common.module.scss'

type MainPropsType = {}


export const Profile: React.FC<MainPropsType> = React.memo(() => {
  // const isAuth = useAppSelector(state => state.auth.isAuth)

  // if (!isAuth) return <Redirect to={PATH.LOGIN}/>
  return (
    <div className={com.profile_container}>
      <Switch>
        <Route path={`${PATH.FORM}`} render={() => <Form/>}/>
      </Switch>
    </div>
  )
})

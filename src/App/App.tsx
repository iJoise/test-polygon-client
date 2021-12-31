import React, {useEffect} from 'react';
import './App.module.scss';
import {Login} from "../pages/Login/Login";
import {checkAuth} from "../store/authSlice/authSlice";
import {Redirect, Route, Switch} from "react-router-dom";
import {Registration} from "../pages/Registration/Registration";
import {PATH} from "../constants/constants";
import {Profile} from "../pages/Profile/Profile";
import {useAppDispatch, useAppSelector} from "../hook/appHooks";
import {Error} from "../features/Error/Error";
import {Preloader} from "../features/Preloader/Preloader";
import {Header} from "../components/Header/Header";
import {Users} from "../pages/Profile/Users/Users";
import st from './App.module.scss'
import {Form} from "../pages/Profile/Form/Form";

export const App = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.app.appStatus)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [dispatch])

  if (status === 'loading') return <Preloader/>

  return (
    <div className={st.App}>
      <Header/>
      <Switch>
        <Route exact path={PATH.LOGIN} render={() => <Login/>}/>
        <Route exact path={PATH.REGISTRATION} render={() => <Registration/>}/>
        <Route path={PATH.PROFILE} render={() => <Profile/>}/>
        <Route path={PATH.USERS } render={() => <Users/>}/>
        <Route path={PATH.FORM } render={() => <Form/>}/>
        <Redirect from={'*'} to={PATH.PROFILE}/>
      </Switch>
      <Error />
    </div>
  );
}
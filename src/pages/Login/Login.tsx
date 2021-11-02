import React, {FC, useEffect, useRef, useState} from "react";
import {AuthModal} from "../../components/AuthModal/AuthModal";
import {loginAT} from "../../store/authSlice/authSlice";
import {NavLink, Redirect} from "react-router-dom";
import {PATH} from "../../constants/constants";
import {Button} from "../../features/Button/Button";
import {useAppDispatch, useAppSelector} from "../../hook/appHooks";
import {Formik} from "formik";
import {InputField} from "../../features/InputField/InputField";
import {LoginPayload} from "../../api/types";
import {english} from "../../utils/regex";
import {checkFocusError, normalizedSubmitData} from "../../utils/forms-helper";
import {emailLogin, LoginSchema, LoginType} from "./LoginSchema";
import st from "./Login.module.scss";
import com from '../../style/common.module.scss'


export const Login: FC = React.memo(() => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const status = useAppSelector(state => state.app.appStatus)
  const focusRef: any = useRef(null)
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    checkFocusError(focusRef, setFocus, focus, dispatch).then()
  }, [focus, dispatch])

  if (isAuth) return <Redirect to={PATH.PROFILE}/>
  const initialValues: LoginType = {[emailLogin]: '', password: ''}
  return (
    <div className={com.container}>
      <AuthModal subtitle='Login'>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            const value: LoginPayload = normalizedSubmitData(values)
            await dispatch(loginAT(value))
          }}
        >
          {({
              values, errors, touched,
              handleChange, handleBlur, handleSubmit,
              isSubmitting,
            }) => (
            <form onSubmit={handleSubmit} ref={focusRef} autoComplete='off'>
              <InputField
                touched={touched[emailLogin]}
                onBlur={handleBlur}
                label={'Email'}
                name={emailLogin}
                placeholder={'например: example@mai.ru'}
                onChange={handleChange}
                value={values[emailLogin]}
                error={touched[emailLogin] ? errors[emailLogin] : ''}
              />
              <InputField
                touched={touched.password}
                onBlur={handleBlur}
                label={'Пароль'}
                name={'password'}
                type={'password'}
                placeholder={'не менее 3х и не более 20 символов'}
                onChange={handleChange}
                value={values.password.replace(english, '')}
                error={touched.password ? errors.password : ''}
              />
              <Button onClick={() => setFocus(true)}
                      disabled={isSubmitting || status === 'error'}
                      type={'submit'}
                      rounded={false}
                      color={'dark-blue'}>Логин</Button>
            </form>
          )}
        </Formik>
        <NavLink to={PATH.REGISTRATION} className={st.navLink}>Регистрация</NavLink>
      </AuthModal>
    </div>
  )
})

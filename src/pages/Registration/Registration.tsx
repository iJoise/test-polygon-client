import React, {FC, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {registrationAT} from "../../store/authSlice/authSlice";
import {AuthModal} from "../../components/AuthModal/AuthModal";
import {Redirect} from "react-router-dom";
import {Button} from "../../features/Button/Button";
import {PATH} from "../../constants/constants";
import {Field, Formik} from "formik";
import {InputField} from "../../features/InputField/InputField";
import {RegistrationPayload} from "../../api/types";
import {emailReg, nameReg, RegistrationSchema, RegistrationType, surnameReg} from "./RegistrationSchema";
import {english, russian} from "../../utils/regex";
import {checkFocusError, normalizedSubmitData} from "../../utils/forms-helper";
import {useAppSelector} from "../../hook/appHooks";
import com from "../../style/common.module.scss";


export const Registration: FC = () => {

  const dispatch = useDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const status = useAppSelector(state => state.app.appStatus)
  const [focus, setFocus] = useState(false);
  const focusRef: any = useRef(null)

  useEffect(() => {
    checkFocusError(focusRef, setFocus, focus, dispatch).then()
  }, [focus, dispatch])

  const onSubmitHandler = (values: RegistrationType) => {
    const value: RegistrationPayload = normalizedSubmitData(values)
    dispatch(registrationAT(value))
  }

  if (isAuth) return <Redirect to={PATH.PROFILE}/>

  const initialValues: RegistrationType = {
    [emailReg]: '',
    [nameReg]: '',
    [surnameReg]: '',
    password: '',
    phone: ''
  }

  return (
    <div className={com.container}>
      <AuthModal subtitle={'Registration'} goBack>
        <Formik
          initialValues={initialValues}
          validationSchema={RegistrationSchema}
          onSubmit={onSubmitHandler}
        >
          {({
              values, errors, touched,
              handleChange, handleBlur, handleSubmit,
              isSubmitting
            }) => (
            <form onSubmit={handleSubmit} autoComplete='something' ref={focusRef}>
              <Field
                name={emailReg}
                placeholder='например: example@mai.ru'
                label={'Email'}
                onBlur={handleBlur}
                onChange={handleChange}
                touched={touched[emailReg]}
                value={values[emailReg]}
                error={touched[emailReg] ? errors[emailReg] : ''}
                as={InputField}
              />
              <Field
                touched={touched.password}
                onBlur={handleBlur}
                label={'Пароль'}
                name={'password'}
                type={'password'}
                placeholder={'не менее 3х и не более 20 символов'}
                onChange={handleChange}
                value={values.password.replace(english, '')}
                error={touched.password ? errors.password : ''}
                as={InputField}
              />
              <Field
                touched={touched[nameReg]}
                onBlur={handleBlur}
                label={'Имя'}
                name={nameReg}
                placeholder={'например: Иван'}
                onChange={handleChange}
                value={values[nameReg].replace(russian, '')}
                error={touched[nameReg] ? errors[nameReg] : ''}
                as={InputField}
              />
              <InputField
                touched={touched[surnameReg]}
                onBlur={handleBlur}
                label={'Фамилия'}
                name={surnameReg}
                placeholder={'например: Иванович'}
                onChange={handleChange}
                value={values[surnameReg].replace(russian, '')}
                error={touched[surnameReg] ? errors[surnameReg] : ''}
              />
              <InputField
                touched={touched.phone}
                onBlur={handleBlur}
                label={'Телефон'}
                name={'phone'}
                placeholder={'+7(___)___-____'}
                onChange={handleChange}
                value={values.phone}
                mask={'+7(999)999-9999'}
                error={touched.phone ? errors.phone : ''}
              />
              <Button disabled={isSubmitting || status === 'error'}
                      onClick={() => setFocus(true)}
                      type={'submit'}
                      rounded={false}
                      color={'dark-blue'}>Регистрация</Button>
            </form>
          )}
        </Formik>
      </AuthModal>
    </div>
  )
}

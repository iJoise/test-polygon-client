import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../hook/appHooks";
import {setStep} from "../../../../store/creditFormSlice/creditFormSlice";
import {checkFocusError} from "../../../../utils/forms-helper";
import {AuthModal} from "../../../../components/AuthModal/AuthModal";
import {Field, Formik} from "formik";
import {Button} from "../../../../features/Button/Button";
import {WorkInfoInitialValuesType, WorkInfoSchema} from "./WorkInfoSchema";
import {AsyncCustomSelect} from "../../../../features/Select/AsyncCustomSelect/AsyncCustomSelect";

type WorkInfoPropsType = {}


export const WorkInfo: React.FC<WorkInfoPropsType> = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.app.appStatus)
  const [focus, setFocus] = useState(false);
  const focusRef: any = useRef(null);


  useEffect(() => {
    checkFocusError(focusRef, setFocus, focus, dispatch).then()
  }, [focus, dispatch])

  const initialValues: WorkInfoInitialValuesType = {
    city: '',
    street: ''
  }

  return (
    <AuthModal subtitle={'Work Info'}>
      <Formik
        initialValues={initialValues}
        validationSchema={WorkInfoSchema}
        onSubmit={(values, {setSubmitting}) => {
          console.log(values)
          setSubmitting(false)
          dispatch(setStep('additional_info'))

        }}
      >
        {({
            values, errors, touched,
            handleChange, handleBlur, handleSubmit,
            isSubmitting,
          }) => (
          <form onSubmit={handleSubmit} autoComplete='something' ref={focusRef}>
            <Field
              component={AsyncCustomSelect}
              label={'Введите ваш город или населённый пункт'}
              placeholder={'Например: Екатеринбург'}
              name={'city'}
              error={touched.city ? errors.city : ''}
              touched={touched.city}
            />
            <Field
              component={AsyncCustomSelect}
              label={'Введите вашу улицу'}
              placeholder={'Например: Ленина'}
              name={'street'}
              error={touched.street ? errors.street : ''}
              touched={touched.street}
            />

            <Button
              disabled={isSubmitting || status === 'error'}
              onClick={() => setFocus(true)}
              type={'submit'}
              rounded={false}
              color={'dark-blue'}>Продолжить</Button>
          </form>
        )}
      </Formik>
    </AuthModal>
  )
}

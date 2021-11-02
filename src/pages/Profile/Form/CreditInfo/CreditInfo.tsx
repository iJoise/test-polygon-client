import React, {useEffect, useRef, useState} from "react";
import {AuthModal} from "../../../../components/AuthModal/AuthModal";
import {useAppDispatch, useAppSelector} from "../../../../hook/appHooks";
import {checkFocusError, normalizedSubmitData} from "../../../../utils/forms-helper";
import {Field, Formik} from "formik";
import {Button} from "../../../../features/Button/Button";
import {CustomSelect} from '../../../../features/Select/CustomSelect/CustomSelect'
import {CreditInfoSchema, InfoValuesType, nameInfo, patronymicInfo, surnameInfo} from "./CreditInfoSchema";
import {InputField} from "../../../../features/InputField/InputField";
import {useHistory} from "react-router-dom";
import {setCreditInfo, setStep} from "../../../../store/creditFormSlice/creditFormSlice";
import {genderOptions, productOptions} from "./CreditInfoData";
import {ProductType} from "../../../../store/creditFormSlice/credit-form-types";
import {PATH} from "../../../../constants/constants";


export const CreditInfo: React.FC = React.memo(() => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const status = useAppSelector(state => state.app.appStatus)
  const user = useAppSelector(state => state.auth.user)
  const creditInfo = useAppSelector(state => state.credit.credit_parameter_info)
  const [focus, setFocus] = useState(false);
  const focusRef: any = useRef(null)
  const [productPath, setProductPath] = useState<ProductType>(creditInfo.product);

  useEffect(() => {
    if (productPath) {
      history.replace(`${productPath}`)
      dispatch(setCreditInfo({...creditInfo, product: productPath}))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productPath])

  useEffect(() => {
    checkFocusError(focusRef, setFocus, focus, dispatch).then()
  }, [focus, dispatch])

  const initialValues: InfoValuesType = {
    [nameInfo]: user.name || '',
    [surnameInfo]: user.surname || '',
    [patronymicInfo]: creditInfo.patronymic || '',
    gender: creditInfo.gender || '',
    product: creditInfo.product
  }

  return (
    <AuthModal subtitle={'Credit Info'}>
      <Formik
        initialValues={initialValues}
        validationSchema={CreditInfoSchema}
        initialTouched={{
          [nameInfo] : !!user.name,
          [surnameInfo]: !!user.surname,
          [patronymicInfo]: !!creditInfo.patronymic,
          gender: !!creditInfo.gender
        }}
        onSubmit={(values, {setSubmitting}) => {
          const value = normalizedSubmitData(values)
          dispatch(setCreditInfo(value))
          setSubmitting(false)
          dispatch(setStep('work_info'))
          history.push(`${PATH.FORM}/workinfo`)
        }}
      >
        {({
            values, errors, touched,
            handleChange, handleBlur, handleSubmit,
            isSubmitting,
          }) => (
          <form onSubmit={handleSubmit}  autoComplete='something' ref={focusRef}>
            <Field
              options={productOptions}
              component={CustomSelect}
              label={'Выберите продукт'}
              error={touched.product ? errors.product : ''}
              touched={touched.product}
              placeholder={'Выбирите ваш пол'}
              state={'product'}
              setState={setProductPath}
              name={'product'}
            />
            <Field
              touched={touched[nameInfo]}
              onBlur={handleBlur}
              label={'Имя'}
              name={nameInfo}
              placeholder={'например: Иван'}
              onChange={handleChange}
              value={values[nameInfo]}
              className={true}
              error={touched[nameInfo] ? errors[nameInfo] : ''}
              as={InputField}
            />
            <Field
              touched={touched[surnameInfo]}
              onBlur={handleBlur}
              label={'Фамилия'}
              name={surnameInfo}
              className={true}
              placeholder={'например: Иванов'}
              onChange={handleChange}
              value={values[surnameInfo]}
              error={touched[surnameInfo] ? errors[surnameInfo] : ''}
              as={InputField}
            />
            <Field
              touched={touched[patronymicInfo]}
              onBlur={handleBlur}
              label={'Отчество'}
              name={patronymicInfo}
              className={true}
              placeholder={'например: Иванович'}
              onChange={handleChange}
              value={values[patronymicInfo]}
              error={touched[patronymicInfo] ? errors[patronymicInfo] : ''}
              as={InputField}
            />
            <Field
              options={genderOptions}
              component={CustomSelect}
              label={'Ваш пол'}
              error={touched.gender ? errors.gender : ''}
              touched={touched.gender}
              placeholder={'Выбирите ваш пол'}
              name={'gender'}
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
})

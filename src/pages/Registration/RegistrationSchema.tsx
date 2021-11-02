import * as Yup from "yup";
import {SchemaOf} from "yup";

export const emailReg = `email${Date.now()}`
export const surnameReg = `surname${Date.now()}`
export const nameReg = `name${Date.now()}`

export const RegistrationSchema: SchemaOf<RegistrationType> = Yup.object().shape({
  password: Yup.string()
    .min(3, 'Короткий Пароль')
    .max(20, 'Длинный Пароль')
    .required('Поле "Пароль" обязательно'),
  [emailReg]: Yup.string()
    .email('Неверный Email')
    .required('Поле "Email" обязательно'),
  [surnameReg]: Yup.string()
    .required('Поле "Фамилия" обязательно')
    .max(15, 'Слишком длинная фамилия')
    .min(2, 'Короткая фамилия'),
  [nameReg]: Yup.string()
    .required('Поле "Имя" обязательно')
    .max(15, 'Слишком длинное имя')
    .min(2, 'Короткое имя'),
  phone: Yup.string()
    .required('Поле "Телефон" обязательно')
    .matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/, 'Неверный формат телефона')
    .min(11, 'Телефон должен содержать 11 цифр')
});

export type RegistrationType = {
  password: string
  phone: string
  [value: string]: string,
}
import * as Yup from "yup";
import {SchemaOf} from "yup";


export const emailLogin = `email${Date.now()}`
export const LoginSchema: SchemaOf<LoginType> = Yup.object().shape({
  password: Yup.string()
    .min(3, 'Короткий пароль')
    .max(20, 'Слишком длинный пароль')
    .required('Поле "Пароль" обязательно'),
  [emailLogin]: Yup.string()
    .email('Неверный Email')
    .required('Поле "Email" обязательно'),
});

export type LoginType = {
  password: string
  [value: string]: string,
}

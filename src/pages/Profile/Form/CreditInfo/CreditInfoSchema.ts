import {SchemaOf} from "yup";
import * as Yup from "yup";

export type InfoValuesType = {
  [key: string]: string
  gender: string
  product: string
}

export const nameInfo = `name${Date.now()}`
export const surnameInfo = `surname${Date.now()}`
export const patronymicInfo = `patronymic${Date.now()}`

export const CreditInfoSchema: SchemaOf<InfoValuesType> = Yup.object().shape({
  [surnameInfo]: Yup.string()
    .required('Поле "Фамилия" обязательно')
    .matches(/^[а-яА-ЯёЁ\s]+$/, 'Допускается только кириллица')
    .max(15, 'Слишком длинная фамилия')
    .min(2, 'Короткая фамилия'),
  [nameInfo]: Yup.string()
    .required('Поле "Имя" обязательно')
    .matches(/^[а-яА-ЯёЁ\s]+$/, 'Допускается только кириллица')
    .max(15, 'Слишком длинное имя')
    .min(2, 'Короткое имя'),
  [patronymicInfo]: Yup.string()
    .required('Поле "Отчество" обязательно')
    .matches(/^[а-яА-ЯёЁ\s]+$/, 'Допускается только кириллица')
    .max(15, 'Слишком длинное отчество')
    .min(2, 'Короткое отчество'),
  gender: Yup.string().nullable().required('Поле "Ваш пол" обязательно'),
  product: Yup.string().required('Поле "Продукт" обязательно')

})
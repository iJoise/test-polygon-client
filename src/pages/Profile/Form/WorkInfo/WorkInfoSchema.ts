import * as Yup from "yup";
import {SchemaOf} from "yup";

export type WorkInfoInitialValuesType = {
  city: string
  street: string
  house: string
}

export const WorkInfoSchema: SchemaOf<WorkInfoInitialValuesType> = Yup.object().shape({
  city: Yup.string()
    .min(2, 'Поле "Город или населённый пункт" обязательно')
    .required('Поле "Город или населённый пункт" обязательно'),
  street: Yup.string()
    .min(2, 'Поле "Введите вашу улицу" обязательно')
    .required('Поле "Введите вашу улицу" обязательно')
    .test({
      name: 'max',
      exclusive: false,
      params: {},
      message: 'Заполните поле "Город или населённый пункт"',
      test: function () {
        return this.parent.city
      }
    }),
  house: Yup.string()
    .min(2, 'Поле "Введите ваш номер дома" обязательно')
    .required('Поле "Введите ваш номер дома" обязательно')
    .test({
      name: 'max',
      exclusive: false,
      params: {},
      message: 'Заполните поле "Введите вашу улицу"',
      test: function () {
        return this.parent.street
      }
    }),

})
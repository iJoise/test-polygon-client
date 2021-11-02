import * as Yup from "yup";
import {SchemaOf} from "yup";

export type WorkInfoInitialValuesType = {
  city: string
  street: string
}

export const WorkInfoSchema: SchemaOf<WorkInfoInitialValuesType> = Yup.object().shape({
  city: Yup.string()
    .required('Поле "Город или населённый пункт" обязательно'),
  street: Yup.string()
    .required('Поле "Город или населённый пункт" обязательно')

})
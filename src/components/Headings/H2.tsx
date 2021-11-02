import React from "react";
import s from "./Headings.module.scss";



export const H2: React.FC = ({children}) => {

   return <h2 className={s.subtitle}>{children}</h2>
}

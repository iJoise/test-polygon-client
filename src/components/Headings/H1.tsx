import React from "react";
import s from "./Headings.module.scss";

type H1PropsType = {
    title?: string;
}


export const H1: React.FC<H1PropsType> = ({title}) => {

    return <h1 className={s.title}>{title || "Magic card"}</h1>
}

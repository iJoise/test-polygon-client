import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './Button.module.scss'


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    color: 'dark-blue' | 'light-blue' | 'pink'
    rounded: boolean
    width?: string | number | undefined
}

export const Button: React.FC<SuperButtonPropsType> = React.memo((
    {
        color,
        className,
        children,
        rounded,
        width,
        ...restProps
    }
) => {

    const widthBtn = {
        width: width
    }

    const finalClassName = ` ${s.button} ${rounded ? s.button__rounded : s.button__default} 
    ${color === 'dark-blue' ? s.button__blue : color === 'light-blue' ? s.button__light_blue : s.button__red}`

    return (
        <button
            className={finalClassName}
            style={widthBtn}
            {...restProps}
        >
            <span>{children}</span>
        </button>
    )
})
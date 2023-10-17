import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType> = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'purple'
  fullWidth?: boolean
  as?: T
  className?: string
  callBack?: () => void
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const {
    variant = 'primary',
    callBack,
    fullWidth,
    className,
    as: Component = 'button',
    ...rest
  } = props

  return (
    <Component
      onClick={callBack}
      className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
      {...rest}
    />
  )
}

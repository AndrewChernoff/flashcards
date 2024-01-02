import { ReactNode } from 'react'

import s from './typography.module.scss'

type TypographyProps = {
  children: ReactNode
  className?: string
}

export const H1 = ({ children, className }: TypographyProps) => {
  return <h1 className={`${s.h1} ${className}`}>{children}</h1>
}
export const H2 = ({ children, className }: TypographyProps) => {
  return <h2 className={`${s.h2} ${className}`}>{children}</h2>
}
export const H3 = ({ children, className }: TypographyProps) => {
  return <h3 className={`${s.h3} ${className}`}>{children}</h3>
}
export const Subtitle1 = ({ children, className }: TypographyProps) => {
  return <p className={`${s.subtitle1} ${className}`}>{children}</p>
}
export const Subtitle2 = ({ children, className }: TypographyProps) => {
  return <p className={`${s.subtitle2} ${className}`}>{children}</p>
}

export const Caption = ({ children, className }: TypographyProps) => {
  return <p className={`${s.caption} ${className}`}>{children}</p>
}

export const Body1 = ({ children, className }: TypographyProps) => {
  return <p className={`${s.body1} ${className}`}>{children}</p>
}

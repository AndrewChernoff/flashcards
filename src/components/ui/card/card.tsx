import { ReactNode } from 'react'

import s from './card.module.scss'

interface Props {
  className?: string
  children?: ReactNode
}

function Card(props: Props) {
  const { children, className } = props

  return (
    <div className={`${s.card} ${className}`}>
      <div className={s.card__container}>{children}</div>
    </div>
  )
}

export default Card

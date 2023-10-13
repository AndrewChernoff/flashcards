import { ReactNode } from 'react'

import s from './card.module.scss'

interface Props {
  children?: ReactNode
}

function Card(props: Props) {
  const { children } = props

  return (
    <div className={s.card}>
      <div className={s.card__container}>{children}</div>
    </div>
  )
}

export default Card

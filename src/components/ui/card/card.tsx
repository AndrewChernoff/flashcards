import { ReactNode } from 'react'

import s from './card.module.scss'

interface Props {
  children?: ReactNode
}

function Card(props: Props) {
  const { children } = props

  return <div className={s.card}>{children}</div>
}

export default Card

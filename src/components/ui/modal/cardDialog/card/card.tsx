import { Body2 } from '../../../../../components/ui/typography/typography'
import { CardItem } from '../../../../../services/decks/types'
import s from '../cardDialog.module.scss'

type CardProps = {
  card: CardItem | null | undefined
}

const Card = ({ card }: CardProps) => {
  return (
    <>
      <p className={s.card__question}>Question: {card?.question} </p>
      {card?.shots && (
        <Body2 className={s.card__shots}>Количество попыток ответов на вопрос: {card.shots}</Body2>
      )}
    </>
  )
}

export default Card

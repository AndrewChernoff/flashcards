import Delete from '../../../../common/svg/delete'
import Edit from '../../../../common/svg/edit'
import { formatDate } from '../../../../common/utils/time-transfering'
import StarRating from '../../../../components/ui/star-rating/star-rating'
import { Table } from '../../../../components/ui/table/table'
import { CardItem } from '../../../../services/decks/types'
import s from '../cards.module.scss'

interface CardItemProps {
  card: CardItem
  myId: string | undefined
}

const Card = (props: CardItemProps) => {
  const { card, myId } = props

  return (
    <Table.Row className={s.dataRow} key={card.id}>
      <Table.DataCell className={s.dataCell}>{card.question}</Table.DataCell>
      <Table.DataCell className={s.dataCell}>{card.answer}</Table.DataCell>
      <Table.DataCell className={s.dataCell}>{formatDate(card.updated)}</Table.DataCell>
      <Table.DataCell className={s.dataCell__withBtns}>
        <StarRating grade={card.grade} />
        {card.userId === myId && (
          <div className={s.dataCell__withBtns_buttons}>
            <button /* onClick={() => openEditDialogHandler(deck.id)} */>
              <Edit />
            </button>
            <button /* onClick={() => openDeleteDialogHandler(deck.id)} */>
              <Delete />
            </button>
          </div>
        )}
      </Table.DataCell>
    </Table.Row>
  )
}

export default Card

import { useState } from 'react'

import Delete from '../../../../common/svg/delete'
import Edit from '../../../../common/svg/edit'
import { formatDate } from '../../../../common/utils/time-transfering'
import DeleteDeckDialog from '../../../../components/ui/modal/delete-dialog/delete-dialog'
import StarRating from '../../../../components/ui/star-rating/star-rating'
import { Table } from '../../../../components/ui/table/table'
import { useDeleteCardMutation } from '../../../../services/decks/decks'
import { CardItem } from '../../../../services/decks/types'
import s from '../cards.module.scss'

interface CardItemProps {
  card: CardItem
  myId: string | undefined
}

const Card = ({ card, myId }: CardItemProps) => {
  const [isOpen, setIsOen] = useState(false)

  const [deleteCard] = useDeleteCardMutation()

  const deleteCardHandler = () => deleteCard(card.id)

  return (
    <>
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
              <button onClick={() => setIsOen(true)}>
                <Delete />
              </button>
            </div>
          )}
        </Table.DataCell>
      </Table.Row>
      <DeleteDeckDialog
        btnDescription="Delete Card"
        isOpen={isOpen}
        closeDialog={() => setIsOen(false)}
        deleteItem={deleteCardHandler}
        title={'Delete Card'}
        description={'Are you sure you want to delete this card?'}
      />
    </>
  )
}

export default Card

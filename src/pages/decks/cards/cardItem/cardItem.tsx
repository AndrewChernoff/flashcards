import { useState } from 'react'

import Delete from '../../../../common/svg/delete'
import Edit from '../../../../common/svg/edit'
import { formatDate } from '../../../../common/utils/time-transfering'
import DeleteDeckDialog from '../../../../components/ui/modal/delete-dialog/delete-dialog'
import UpdateCardDialog from '../../../../components/ui/modal/update-card-dialog/update-card-dialog'
import StarRating from '../../../../components/ui/star-rating/star-rating'
import { Table } from '../../../../components/ui/table/table'
import { useDeleteCardMutation } from '../../../../services/cards/cards'
import { CardItem } from '../../../../services/decks/types'
import s from '../cards.module.scss'

interface CardItemProps {
  card: CardItem
  myId: string | undefined
}

const Card = ({ card, myId }: CardItemProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditOpen, setIsEditOen] = useState(false)

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
              <button tabIndex={-1} onClick={() => setIsEditOen(true)}>
                <Edit />
              </button>
              <button tabIndex={1} onClick={() => setIsDeleteOpen(true)}>
                <Delete />
              </button>
            </div>
          )}
        </Table.DataCell>
      </Table.Row>
      <DeleteDeckDialog
        btnDescription="Delete Card"
        isOpen={isDeleteOpen}
        closeDialog={() => setIsDeleteOpen(false)}
        deleteItem={deleteCardHandler}
        title={'Delete Card'}
        description={'Are you sure you want to delete this card?'}
      />

      <UpdateCardDialog
        isOpen={isEditOpen}
        closeDialog={() => setIsEditOen(false)}
        cardId={card.id}
      />
    </>
  )
}

export default Card

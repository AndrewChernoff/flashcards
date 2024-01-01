import { Link } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/redux-hooks'
import defaultCover from '../../../common/imgs/default-cover.png'
import Delete from '../../../common/svg/delete'
import Edit from '../../../common/svg/edit'
import PlayCircle from '../../../common/svg/play-circle'
import { formatDate } from '../../../common/utils/time-transfering'
import s from '../../../pages/decks/decks.module.scss'
import { getDeckd } from '../../../services/decks/cards-slice'
import { DeckItemType } from '../../../services/decks/types'
import { Table } from '../table/table'

type DeckItemProps = {
  deck: any
  myId?: string | null
  openDeleteDialog: (id: string) => void
  openEditDialog: (id: string) => void
  openCardDialog: () => void
}

const DeckItem = ({
  deck,
  myId,
  openDeleteDialog,
  openEditDialog,
  openCardDialog,
}: DeckItemProps) => {
  const dispatch = useAppDispatch()
  const openDeleteDialogHandler = (id: string) => openDeleteDialog(id)
  const openEditDialogHandler = (id: string) => openEditDialog(id)

  const getCardIdHandler = (deck: DeckItemType) => dispatch(getDeckd(deck))
  const openCardDialogHandler = (deck: DeckItemType) => {
    getCardIdHandler(deck)
    openCardDialog()
  }

  return (
    <Table.Row className={s.dataRow} key={deck.id}>
      <Table.DataCell className={s.dataCell}>
        <Link to={`/decks/${deck.id}`}>
          <img className={s.dataCell__img} src={deck.cover || defaultCover} />
        </Link>
      </Table.DataCell>
      <Table.DataCell className={s.dataCell}>{deck.name}</Table.DataCell>
      <Table.DataCell className={s.dataCell}>{deck.cardsCount}</Table.DataCell>
      <Table.DataCell className={s.dataCell}>{formatDate(deck.updated)}</Table.DataCell>
      <Table.DataCell className={`${s.dataCell} ${s.decks__createdBy}`}>
        {deck.author.name}

        <div className={s.decks__createdBy_buttons}>
          <button onClick={() => openCardDialogHandler(deck)}>
            <PlayCircle />
          </button>
          {deck.author.id === myId && (
            <>
              <button onClick={() => openEditDialogHandler(deck.id)}>
                <Edit />
              </button>
              <button onClick={() => openDeleteDialogHandler(deck.id)}>
                <Delete />
              </button>
            </>
          )}
        </div>
      </Table.DataCell>
    </Table.Row>
  )
}

export default DeckItem

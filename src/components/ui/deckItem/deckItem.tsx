import { useState } from 'react'

import { Link } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/redux-hooks'
import defaultCover from '../../../common/imgs/default-cover.png'
import Delete from '../../../common/svg/delete'
import Edit from '../../../common/svg/edit'
import PlayCircle from '../../../common/svg/play-circle'
import { formatDate } from '../../../common/utils/time-transfering'
import s from '../../../pages/decks/decks.module.scss'
import { getDeck } from '../../../services/decks/cards-slice'
import {
  useDeleteDeckMutation,
  useLazyGetCardByIdQuery,
  useUpdateDeckMutation,
} from '../../../services/decks/decks'
import { DeckItemType } from '../../../services/decks/types'
import CardDialog from '../modal/cardDialog/cardDialog'
import DeleteDeckDialog from '../modal/deleteDeckDialog/deleteDeckDialog'
import UpdateDeckDialog from '../modal/updateDeckDialog/updateDeckDialog'
import { Table } from '../table/table'

type DeckItemProps = {
  deck: any
  myId?: string | null
}

const DeckItem = ({ deck, myId }: DeckItemProps) => {
  const dispatch = useAppDispatch()

  /*delete deck functionality */
  const [isDeletePackDialodOpen, setIsDeletePackDialogOpen] = useState<boolean>(false)
  const [deleteDeckId, setDeleteDeckId] = useState<string | null>(null)

  /*update deck functionality */
  const [isUpdatePackDialodOpen, setIsUpdatePackDialodOpen] = useState<boolean>(false)
  const [updateDeckId, setUpdateDeckId] = useState<string | null>(null)

  /*open card dialog  functionality*/
  const [isCardDialogOpen, setIsCardDialogOpen] = useState<boolean>(false)

  const [trigger, { data: card }] = useLazyGetCardByIdQuery() /// get card on request
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()

  /* const openDeleteDialogHandler = (id: string) => openDeleteDialog(id)
  const openEditDialogHandler = (id: string) => openEditDialog(id)
 */
  /*Delete deck dialog functions */
  const handleDeleteDeckDialog = (id: string) => {
    ///when open dialog we get id from there for deleting deck from dialog window
    setIsDeletePackDialogOpen(!isDeletePackDialodOpen)
    setDeleteDeckId(id)
  }

  const handleDeleteDeck = () => {
    if (deleteDeckId) {
      deleteDeck({ id: deleteDeckId })
      setDeleteDeckId(null)
      setIsDeletePackDialogOpen(!isDeletePackDialodOpen)
    }
  }

  /*Update deck dialog functions */
  const handleUpdateDeckDialog = (id: string) => {
    setIsUpdatePackDialodOpen(!isUpdatePackDialodOpen)
    setUpdateDeckId(id)
  }

  const handleUpdateDeck = (obj: any) => {
    if (updateDeckId) {
      updateDeck({ id: updateDeckId, data: obj })
      setUpdateDeckId(null)
      setIsUpdatePackDialodOpen(!isUpdatePackDialodOpen)
    }
  }

  const openCardDialogHandler = (deck: DeckItemType) => {
    ///retrieving random card from deck to learn
    dispatch(getDeck(deck))
    setIsCardDialogOpen(true)
  }

  return (
    <>
      <Table.Row className={s.dataRow} key={deck.id}>
        <Table.DataCell className={s.dataCell}>
          <Link to={`/decks/${deck.id}/cards`} state={{ deckName: deck.name, userId: deck.userId }}>
            <img className={s.dataCell__img} src={deck.cover || defaultCover} />
          </Link>
        </Table.DataCell>
        <Table.DataCell className={s.dataCell}>{deck.name}</Table.DataCell>
        <Table.DataCell className={s.dataCell}>{deck.cardsCount}</Table.DataCell>
        <Table.DataCell className={s.dataCell}>{formatDate(deck.updated)}</Table.DataCell>
        <Table.DataCell className={`${s.dataCell} ${s.decks__createdBy}`}>
          {deck.author.name}

          <div className={s.decks__createdBy_buttons}>
            <button
              onClick={() => {
                openCardDialogHandler(deck)
                trigger(deck.id)
              }}
            >
              <PlayCircle />
            </button>
            {deck.author.id === myId && (
              <>
                <button onClick={() => handleUpdateDeckDialog(deck.id)}>
                  <Edit />
                </button>
                <button onClick={() => handleDeleteDeckDialog(deck.id)}>
                  <Delete />
                </button>
              </>
            )}
          </div>
        </Table.DataCell>
      </Table.Row>

      {/*Dialogs */}
      <CardDialog
        isOpen={isCardDialogOpen}
        card={card}
        closeDialog={() => setIsCardDialogOpen(false)}
        requestCard={trigger}
      />
      <UpdateDeckDialog
        isOpen={isUpdatePackDialodOpen}
        closeDialog={(value: boolean) => setIsUpdatePackDialodOpen(value)}
        callback={handleUpdateDeck}
        btnDescription={'Edit pack'}
      />
      <DeleteDeckDialog
        isOpen={isDeletePackDialodOpen}
        closeDialog={() => setIsDeletePackDialogOpen(false)}
        deleteDeck={handleDeleteDeck}
      />
    </>
  )
}

export default DeckItem

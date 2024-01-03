import { useAppDispatch, useAppSelector } from '../../../../common/hooks/redux-hooks'
import { getDeck } from '../../../../services/decks/cards-slice'
import { CardItem } from '../../../../services/decks/types'
import { H2 } from '../../typography/typography'
import Modal from '../modal'

import s from './cardDialog.module.scss'

type AddDeckDialogType = {
  isOpen: boolean
  closeDialog: (value: boolean) => void
  card: CardItem | null | undefined
}

const CardDialog = ({ isOpen, closeDialog }: AddDeckDialogType) => {
  const deck = useAppSelector(state => state.deck.deck)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(getDeck(null))
    closeDialog(false)
  }

  return (
    <Modal isOpen={isOpen} callBack={handleClose}>
      <div className={s.card}>
        <div className={s.card__container}>
          <div className={s.card__header}>
            <H2>Learn &#34;{deck?.name}&#34;</H2>
            {deck?.cardsCount === 0 ? (
              <p>There is no cards. Go back to decks list and learn another one</p>
            ) : (
              <p> Some question in Future</p>
            )}
            {/* <button onClick={handleClose}>X</button> */}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CardDialog

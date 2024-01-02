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
      <div className={s.form__header}>
        <H2>Learn {deck?.name}</H2>
        <button onClick={handleClose}>X</button>
      </div>
    </Modal>
  )
}

export default CardDialog

import { useAppSelector } from '../../../../common/hooks/redux-hooks'
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
  const deck = useAppSelector(state => state.card.deck)

  return (
    <Modal isOpen={isOpen} callBack={closeDialog}>
      <div className={s.form__header}>
        <H2>Learn {deck?.name}</H2>
        <button onClick={() => closeDialog(false)}>X</button>
      </div>
    </Modal>
  )
}

export default CardDialog

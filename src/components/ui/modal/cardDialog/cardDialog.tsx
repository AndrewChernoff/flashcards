import { H2 } from '../../typography/typography'
import Modal from '../modal'

import s from './cardDialog.module.scss'

type AddDeckDialogType = {
  isOpen: boolean
  closeDialog: (value: boolean) => void
}

const CardDialog = ({ isOpen, closeDialog }: AddDeckDialogType) => {
  return (
    <Modal isOpen={isOpen} callBack={closeDialog}>
      <div className={s.form__header}>
        <H2>Dialog</H2>
        <button onClick={() => closeDialog(false)}>X</button>
      </div>
    </Modal>
  )
}

export default CardDialog

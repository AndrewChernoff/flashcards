import { Button } from '../../button'
import { H2 } from '../../typography/typography'
import Modal from '../modal'

import s from './deleteDeckDialog.module.scss'

export type AddDeckInputs = {
  name: string
  cover?: any
  isPrivate: boolean
}

type AddDeckDialogType = {
  isOpen: boolean
  closeDialog: () => void
  deleteDeck: () => void
}

const DeleteDeckDialog = ({ isOpen, closeDialog, deleteDeck }: AddDeckDialogType) => {
  const closeDialogHandler = () => closeDialog()

  return (
    <Modal isOpen={isOpen} callBack={closeDialog}>
      <div className={s.dialog}>
        <div className={s.dialog__header}>
          <H2>Delete Pack</H2>
          <button onClick={closeDialogHandler}>X</button>
        </div>
        <div className={s.dialog__content}>
          Do you really want to remove Pack Name? All cards will be deleted.
        </div>
        <div className={s.dialog__buttons}>
          <Button
            type="button"
            className={s.dialog__buttons_cancel}
            variant="secondary"
            callBack={closeDialogHandler}
          >
            Cancel
          </Button>
          <Button className={s.dialog__buttons_add} callBack={deleteDeck} variant="tertiary">
            Delete Pack
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteDeckDialog

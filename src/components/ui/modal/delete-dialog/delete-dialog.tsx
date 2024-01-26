import { Button } from '../../button'
import { H2 } from '../../typography/typography'
import Modal from '../modal'

import s from './delete-dialog.module.scss'

export type AddDeckInputs = {
  name: string
  cover?: any
  isPrivate: boolean
}

type AddDeckDialogType = {
  isOpen: boolean
  closeDialog: () => void
  deleteItem: () => void
  title: string
  description: string
  btnDescription: string
}

const DeleteDeckDialog = ({
  isOpen,
  closeDialog,
  deleteItem,
  description,
  title,
  btnDescription,
}: AddDeckDialogType) => {
  const closeDialogHandler = () => closeDialog()

  return (
    <Modal isOpen={isOpen} callBack={closeDialog}>
      <div className={s.dialog}>
        <div className={s.dialog__header}>
          <H2>{title}</H2>
          <button onClick={closeDialogHandler}>X</button>
        </div>
        <div className={s.dialog__content}>{description}</div>
        <div className={s.dialog__buttons}>
          <Button
            type="button"
            className={s.dialog__buttons_cancel}
            variant="secondary"
            callBack={closeDialogHandler}
          >
            Cancel
          </Button>
          <Button
            className={s.dialog__buttons_add}
            callBack={() => {
              closeDialog()
              deleteItem()
            }}
            variant="tertiary"
          >
            {btnDescription}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteDeckDialog

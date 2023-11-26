import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

type ModalType = {
  isOpen: boolean
  callBack: (value: boolean) => void
}

const Modal = ({ isOpen, callBack }: ModalType) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={e => callBack(e)}>
      {/* <Dialog.Trigger>Open</Dialog.Trigger> */}
      <Dialog.Portal>
        <Dialog.Overlay className={s.dialog__overlay} />
        <Dialog.Content className={s.dialog}>
          <div className={s.dialog__container}>
            <div className={s.dialog__header}>
              <h3>Add New Pack</h3>
              <button onClick={() => callBack(false)}>X</button>
            </div>

            <div>Heyyy</div>
            <div>Heyyy</div>
            <div>Heyyy</div>
            <div>Heyyy</div>

            <button type="submit">Submit</button>
            {/*  </form> */}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal

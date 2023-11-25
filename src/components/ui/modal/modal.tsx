import { useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

type ModalType = {
  isOpen: boolean
}
const wait = () => new Promise(resolve => setTimeout(resolve, 1000))

const Modal = ({ isOpen }: ModalType) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className={s.dialog}>
          <form
            onSubmit={event => {
              wait().then(() => setOpen(false))
              event.preventDefault()
            }}
          >
            <div>Heyyy</div>
            <div>Heyyy</div>
            <div>Heyyy</div>
            <div>Heyyy</div>
            <div>Heyyy</div>
            <div>Heyyy</div>
            <div>Heyyy</div>
            <div>Heyyy</div>
            <div>Heyyy</div>
            <div>Heyyy</div>
            <button type="submit">Submit</button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal

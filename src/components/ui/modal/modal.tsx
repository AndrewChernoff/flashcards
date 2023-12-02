import { ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  callBack: (value: boolean) => void
}

const Modal = ({ children, isOpen, callBack }: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={e => callBack(e)}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.modal__overlay} />
        <Dialog.Content className={s.modal}>{children}</Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal

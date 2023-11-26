import { DevTool } from '@hookform/devtools'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'

import Input from '../input/input'

import s from './modal.module.scss'

type Inputs = {
  name: string
  cover: string | null
  isPrivate: boolean
}

type ModalType = {
  isOpen: boolean
  callBack: (value: boolean) => void
}

const Modal = ({ isOpen, callBack }: ModalType) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  return (
    <>
      {' '}
      <DevTool control={control} placement="top-left" />
      <Dialog.Root open={isOpen} onOpenChange={e => callBack(e)}>
        <Dialog.Portal>
          <Dialog.Overlay className={s.dialog__overlay} />
          <Dialog.Content className={s.dialog}>
            <div className={s.dialog__header}>
              <h3>Add New Pack</h3>
              <button onClick={() => callBack(false)}>X</button>
            </div>
            <div className={s.dialog__functionality}>
              <Input
                isSearch={false}
                placeholder={'Name'}
                label={'Name Pack'}
                type={'text'}
                {...register('name')}
              />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

export default Modal

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

import { useAddDeckMutation } from '../../../services/decks/decks'
import { Button } from '../button'
import ControlledCheckbox from '../controlled/controlled-checkbox'
import Input from '../input/input'

import s from './modal.module.scss'

export type AddDeckInputs = {
  name: string
  cover: string | null
  isPrivate: boolean
}

type ModalType = {
  isOpen: boolean
  callBack: (value: boolean) => void
}

const schema = z.object({
  name: z.string().min(5, { message: 'Value must be more than 5 symbols' }),
})

const Modal = ({ isOpen, callBack }: ModalType) => {
  const [addDeck] = useAddDeckMutation()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddDeckInputs>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<AddDeckInputs> = data => {
    addDeck(data)
    reset()
    callBack(false)
  }

  return (
    <>
      <DevTool control={control} placement="top-left" />
      <Dialog.Root open={isOpen} onOpenChange={e => callBack(e)}>
        <Dialog.Portal>
          <Dialog.Overlay className={s.dialog__overlay} />
          <Dialog.Content className={s.dialog}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={s.dialog__header}>
                <h3>Add New Pack</h3>
                <button onClick={() => callBack(false)}>X</button>
              </div>
              <div className={s.dialog__functionality}>
                <div className={s.dialog__functionality_cover}>
                  <img src="https://s3-alpha-sig.figma.com/img/796f/62d9/8f77a51611a552cfd42b1ec2f4c1e4c6?Expires=1702252800&Signature=amS~V9x15hbUXhFxc4pxLLvHRa55nPRumUmBmoSTkwdhhfb1xOQYo6GNPg5Vrl4mXJDaYFyuRTIdTf0425TzOT7W6h1wzednx75E46r1b8qY1K503DKSvLSzfPWyaSPUYLAuPP8IX5F9~chJgjnsm4fZfUB0cy0BDBh-Y6fqnVS3z5BMMnNq1o5-QZ-m33Kk6kMnl2vmsolV-Xha4P~3ZxbsmDkZU~LZDOWbzkoCmVnVL-NrRZkxvYp9SgXee~wqT94Xkrq~p7A8~MpqzTHW4slalSg29Lqu~jVOsPuYS3-GEvYP2qszfUxExY7UEy2HX9tHaxIn-X2y~v8amb7XjQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                  <Input
                    isSearch={false}
                    placeholder={'Name'}
                    label={'Name Pack'}
                    type={'file'}
                    id={'cover'}
                    {...register('cover')}
                  />
                </div>

                <Input
                  isSearch={false}
                  placeholder={'Name'}
                  label={'Name Pack'}
                  type={'text'}
                  error={errors.name && errors.name.message}
                  {...register('name')}
                />

                <ControlledCheckbox
                  name={'isPrivate'}
                  control={control}
                  label={'Private pack'}
                  id={'private pack'}
                  className={s.dialog__checkbox}
                />
              </div>

              <div className={s.dialog__buttons}>
                <Button className={s.dialog__buttons_cancel} variant="secondary">
                  Cancel
                </Button>
                <Button
                  className={s.dialog__buttons_add}
                  variant="tertiary"
                  /* callBack={() => onSubmit()} */
                >
                  Add New Pack
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

export default Modal

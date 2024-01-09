import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '../../button'
import ControlledCheckbox from '../../controlled/controlled-checkbox'
import Input from '../../input/input'
import { H2 } from '../../typography/typography'
import Modal from '../modal'

import s from './../addDeckDialog/addDeckDialog.module.scss'

export type UpdateDeckInputs = {
  name: string
  isPrivate: boolean
}

type UpdateDeckDialogType = {
  isOpen: boolean
  closeDialog: (value: boolean) => void
  callback: (obj: UpdateDeckInputs) => void //// callback updates the deck depending on parametrs from parent component
}

const UpdateDeckDialog = ({ isOpen, closeDialog, callback }: UpdateDeckDialogType) => {
  const schema = z.object({
    name: z
      .string()
      .min(3, { message: 'name must be longer than or equal to 3 characters' })
      .optional(),
    isPrivate: z.boolean().optional(),
  })

  const {
    register,
    handleSubmit,
    control,
    /* setValue, */
    reset,
    formState: { errors },
  } = useForm<UpdateDeckInputs>({
    resolver: zodResolver(schema),
  })

  //const [preview, setPriview] = useState<string | null>(null)

  const onSubmit: any = handleSubmit(data => {
    const formData: any = new FormData()

    data.name && formData.append('name', data.name)
    data.isPrivate && formData.append('isPrivate', data.isPrivate)
    callback(formData)
    reset()
    closeDialog(false)
  })

  const closeDialogHandler = () => {
    closeDialog(false)
    reset()
  }

  return (
    <Modal isOpen={isOpen} callBack={closeDialog}>
      <form onSubmit={onSubmit}>
        <DevTool control={control} />

        <div className={s.form__header}>
          <H2>Edit Pack</H2>
          <button onClick={closeDialogHandler}>X</button>
        </div>
        <div className={s.form__functionality}>
          <Input
            isSearch={false}
            placeholder={'Name'}
            label={'Name Pack'}
            type={'text'}
            error={errors.name && errors.name.message}
            {...register('name')}
          />

          <ControlledCheckbox
            control={control}
            label={'Private pack'}
            id={'isPrivate'}
            className={s.form__checkbox}
            name={'isPrivate'}
          />
        </div>

        <div className={s.form__buttons}>
          <Button
            type="button"
            className={s.form__buttons_cancel}
            variant="secondary"
            callBack={() => reset()}
          >
            Cancel
          </Button>
          <Button className={s.form__buttons_add} variant="tertiary">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default UpdateDeckDialog

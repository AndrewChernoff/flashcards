import { useState } from 'react'

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
  cover?: any
  isPrivate: boolean
}

type UpdateDeckDialogType = {
  isOpen: boolean
  closeDialog: (value: boolean) => void
  callback: (obj: UpdateDeckInputs) => void //// callback updates the deck depending on parametrs from parent component
  btnDescription: string
}

const UpdateDeckDialog = ({
  isOpen,
  closeDialog,
  callback,
  btnDescription,
}: UpdateDeckDialogType) => {
  const schema = z.object({
    name: z
      .string()
      .min(3, { message: 'name must be longer than or equal to 3 characters' })
      .optional(),
    cover: z.any().optional(),
    isPrivate: z.boolean().optional(),
  })

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateDeckInputs>({
    resolver: zodResolver(schema),
  })

  const [preview, setPriview] = useState<string | null>(null)

  const onSubmit: any = handleSubmit(data => {
    const formData: any = new FormData()

    data.name && formData.append('name', data.name)
    data.cover && formData.append('cover', data.cover)
    data.isPrivate && formData.append('isPrivate', data.isPrivate)
    callback(formData)
    reset()
    closeDialog(false)
  })

  const closeDialogHandler = () => {
    closeDialog(false)
    setPriview(null)
    reset()
  }

  const imageSrc = preview

  return (
    <Modal isOpen={isOpen} callBack={closeDialog}>
      <form onSubmit={onSubmit}>
        <DevTool control={control} />

        <div className={s.form__header}>
          <H2>Edit Pack</H2>
          <button onClick={closeDialogHandler}>X</button>
        </div>
        <div className={s.form__functionality}>
          <div className={s.form__functionality_cover}>
            <img
              src={
                imageSrc
                  ? imageSrc
                  : 'https://s3-alpha-sig.figma.com/img/796f/62d9/8f77a51611a552cfd42b1ec2f4c1e4c6?Expires=1702252800&Signature=amS~V9x15hbUXhFxc4pxLLvHRa55nPRumUmBmoSTkwdhhfb1xOQYo6GNPg5Vrl4mXJDaYFyuRTIdTf0425TzOT7W6h1wzednx75E46r1b8qY1K503DKSvLSzfPWyaSPUYLAuPP8IX5F9~chJgjnsm4fZfUB0cy0BDBh-Y6fqnVS3z5BMMnNq1o5-QZ-m33Kk6kMnl2vmsolV-Xha4P~3ZxbsmDkZU~LZDOWbzkoCmVnVL-NrRZkxvYp9SgXee~wqT94Xkrq~p7A8~MpqzTHW4slalSg29Lqu~jVOsPuYS3-GEvYP2qszfUxExY7UEy2HX9tHaxIn-X2y~v8amb7XjQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
              }
            />
            <div className={s.file}>
              <label htmlFor={'cover'} className={s.file__label}>
                Change Cover
              </label>
              {
                <input
                  {...register('cover')}
                  onChange={e => {
                    e.target.files && setPriview(URL.createObjectURL(e.target.files[0]))
                    e.target.files &&
                      setValue('cover', e.target.files[0], {
                        shouldDirty: true,
                        shouldTouch: true,
                      })
                  }}
                  type={'file'}
                  className={s.file__input}
                  id={'cover'}
                  name="cover"
                />
              }
            </div>
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
            {btnDescription}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default UpdateDeckDialog

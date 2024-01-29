import { ChangeEvent, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '../../button'
import ControlledCheckbox from '../../controlled/controlled-checkbox'
import Fileinput from '../../fileinput/fileinput'
import Input from '../../input/input'
import { H2 } from '../../typography/typography'
import Modal from '../modal'

import s from './add-deck-dialog.module.scss'

import defaultImg from '@/common/imgs/default-cover.png'
import { onImgChange } from '@/common/utils/toBase64'

export type AddDeckInputs = {
  name: string
  cover?: any
  isPrivate: boolean
}

type AddDeckDialogType = {
  isOpen: boolean
  closeDialog: (value: boolean) => void
  callback: (obj: AddDeckInputs) => void //// callback updates adds a deck depending on parametrs from parent component
  btnDescription: string
}

const AddDeckDialog = ({ isOpen, closeDialog, callback, btnDescription }: AddDeckDialogType) => {
  const schema = z.object({
    name: z.string().min(3, { message: 'name must be longer than or equal to 3 characters' }),
    cover: z.any().optional(),
    isPrivate: z.boolean(),
  })

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddDeckInputs>({
    resolver: zodResolver(schema),
  })

  const [preview, setPriview] = useState<string | null>(null)

  const onSubmit = handleSubmit(data => {
    const formData: any = new FormData()

    formData.append('name', data.name)
    formData.append('cover', data.cover)
    formData.append('isPrivate', data.isPrivate)
    callback(formData)
    reset()
    closeDialog(false)
  })

  const onCoverImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    onImgChange(e, 'cover', setPriview, setValue)
  }

  const imageSrc = preview

  return (
    <Modal isOpen={isOpen} callBack={closeDialog}>
      <form onSubmit={onSubmit}>
        <div className={s.form__header}>
          <H2>Add New Pack</H2>
          <button onClick={() => closeDialog(false)}>X</button>
        </div>
        <div className={s.form__functionality}>
          <div className={s.form__functionality_cover}>
            <img src={imageSrc ? imageSrc : defaultImg} />
            <Controller
              control={control}
              name={'cover'}
              render={() => {
                return (
                  <Fileinput onImgChange={onCoverImgChange} title={'Change Cover'} id={'cover'} />
                )
              }}
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

export default AddDeckDialog

import { ChangeEvent, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '../../button'
import ControlledCheckbox from '../../controlled/controlled-checkbox'
import Fileinput from '../../fileinput/fileinput'
import Input from '../../input/input'
import { H2 } from '../../typography/typography'
import Modal from '../modal'

import s from './../add-deck-dialog/add-deck-dialog.module.scss'

import { onImgChange } from '@/common/utils/toBase64'

export type UpdateDeckInputs = {
  cover: File
  name: string
  isPrivate: boolean
}

type UpdateDeckDialogType = {
  deckName: string
  deckCover: string | null
  deckIsPrivate: boolean
  isOpen: boolean
  closeDialog: (value: boolean) => void
  callback: (obj: UpdateDeckInputs) => void //// callback updates the deck depending on parametrs from parent component
}

const UpdateDeckDialog = ({
  isOpen,
  closeDialog,
  callback,
  deckName,
  deckCover,
  deckIsPrivate,
}: UpdateDeckDialogType) => {
  const schema = z.object({
    cover: z.instanceof(File).optional(),
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
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<UpdateDeckInputs>({
    resolver: zodResolver(schema),
  })

  const [preview, setPriview] = useState<string | null>(null)

  useEffect(() => {
    setValue('name', deckName)
    setValue('isPrivate', deckIsPrivate)
  }, [deckName, deckIsPrivate, getValues().name, getValues().isPrivate])

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
    reset()
  }

  const onCoverImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    onImgChange(e, 'cover', setPriview, setValue)
  }

  return (
    <Modal isOpen={isOpen} callBack={closeDialog}>
      <form onSubmit={onSubmit}>
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
          <div className={s.form__cover}>
            {preview && <img src={preview} alt="" />}
            {!preview && deckCover && <img src={deckCover} alt="" />}
            <Controller
              control={control}
              name={'cover'}
              render={() => {
                return (
                  <Fileinput
                    onImgChange={onCoverImgChange}
                    title={'Change Cover'}
                    id={'questionImg'}
                  />
                )
              }}
            />
          </div>

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
            callBack={closeDialogHandler}
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

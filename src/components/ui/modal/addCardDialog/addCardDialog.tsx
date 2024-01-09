import { useState } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '../../button'
import Input from '../../input/input'
import { H2 } from '../../typography/typography'
import Modal from '../modal'

import s from './addNewCardDialog.module.scss'

export type AddDeckInputs = {
  question: string
  answer: string
  questionImg: string
  answerImg: string
}

type AddCardDialogType = {
  isOpen: boolean
  closeDialog: (value: boolean) => void
  callback: (obj: AddDeckInputs) => void //// callback updates adds a deck depending on parametrs from parent component
}

const AddDeckDialog = ({ isOpen, closeDialog, callback }: AddCardDialogType) => {
  const schema = z.object({
    question: z.string(),
    answer: z.string(),
    questionImg: z.string(),
    answerImg: z.string(),
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

  const onSubmit: any = handleSubmit(data => {
    const formData: any = new FormData()

    /* formData.append('name', data.name)
    formData.append('cover', data.cover)
    formData.append('isPrivate', data.isPrivate)
     */ callback(formData)
    reset()
    closeDialog(false)
  })

  //const imageSrc = preview

  return (
    <Modal isOpen={isOpen} callBack={closeDialog}>
      <form onSubmit={onSubmit}>
        <DevTool control={control} />

        <div className={s.form__header}>
          <H2>Add New Card</H2>
          <button onClick={() => closeDialog(false)}>X</button>
        </div>

        <Input
          isSearch={false}
          placeholder={'Question'}
          label={'Question'}
          type={'text'}
          error={errors.question && errors.question.message}
          {...register('question')}
        />
        <Input
          isSearch={false}
          placeholder={'Answer'}
          label={'Answer'}
          type={'text'}
          error={errors.answer && errors.answer.message}
          {...register('answer')}
        />

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
            Add New Card
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddDeckDialog

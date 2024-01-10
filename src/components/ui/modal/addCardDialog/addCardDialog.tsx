import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

import { useAddCardMutation } from '../../../../services/decks/decks'
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
  deckId: string
}

const AddDeckDialog = ({ isOpen, closeDialog, deckId }: AddCardDialogType) => {
  const schema = z.object({
    question: z.string().min(3, { message: 'name must be longer than or equal to 3 characters' }),
    answer: z.string().min(3, { message: 'name must be longer than or equal to 3 characters' }),
  })

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddDeckInputs>({
    resolver: zodResolver(schema),
  })

  const [addCard] = useAddCardMutation()

  const onSubmit: SubmitHandler<AddDeckInputs> = data => {
    const formData = new FormData()

    formData.append('answer', data.answer)
    formData.append('question', data.question)
    addCard({ id: deckId, card: formData })
    reset()
    closeDialog(false)
  }

  const closeDialogHandler = () => {
    closeDialog(false)
    reset()
  }

  return (
    <Modal isOpen={isOpen} callBack={closeDialogHandler}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <DevTool control={control} />

        <div className={s.form__header}>
          <H2>Add New Card</H2>
          <button onClick={closeDialogHandler}>X</button>
        </div>

        <div className={s.form__functionality}>
          <Input
            className={s.textField}
            isSearch={false}
            placeholder={'Question'}
            label={'Question'}
            type={'text'}
            error={errors.question && errors.question.message}
            {...register('question')}
          />
          <Input
            className={s.textField}
            isSearch={false}
            placeholder={'Answer'}
            label={'Answer'}
            type={'text'}
            error={errors.answer && errors.answer.message}
            {...register('answer')}
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
          <Button type="submit" className={s.form__buttons_add} variant="tertiary">
            Add New Card
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddDeckDialog

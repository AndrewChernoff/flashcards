import { ChangeEvent, useState } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

import { useAddCardMutation } from '../../../../services/decks/decks'
import { Button } from '../../button'
import Fileinput from '../../fileinput/fileinput'
import Input from '../../input/input'
import SelectDemo from '../../select/select'
import { H2, Subtitle2 } from '../../typography/typography'
import Modal from '../modal'

import s from './add-card-dialog.module.scss'

export type AddDeckInputs = {
  question: string
  answer: string
  questionImg: File
  answerImg: File
}

type AddCardDialogType = {
  isOpen: boolean
  closeDialog: (value: boolean) => void
  deckId: string
}

const AddDeckDialog = ({ isOpen, closeDialog, deckId }: AddCardDialogType) => {
  const [select, setSelect] = useState<string>('text') // should be 'text' or 'image'
  const [questionImgPreview, setQuestionImgPreview] = useState<string | null>(null)
  const [answerImgPreview, setAnswerImgPreview] = useState<string | null>(null)

  const schema = z.object({
    question: z.string().min(3, { message: 'name must be longer than or equal to 3 characters' }),
    answer: z.string().min(3, { message: 'name must be longer than or equal to 3 characters' }),
    questionImg: z.instanceof(File).optional(),
    answerImg: z.instanceof(File).optional(),
  })

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddDeckInputs>({
    resolver: zodResolver(schema),
  })

  const [addCard] = useAddCardMutation()

  const onSubmit: SubmitHandler<AddDeckInputs> = data => {
    const formData = new FormData()

    formData.append('answer', data.answer)
    formData.append('question', data.question)
    data.questionImg && formData.append('questionImg', data.questionImg)
    data.answerImg && formData.append('answerImg', data.answerImg)
    addCard({ id: deckId, card: formData })
    reset()
    closeDialog(false)
  }

  const closeDialogHandler = () => {
    setAnswerImgPreview(null)
    setQuestionImgPreview(null)
    closeDialog(false)
    reset()
    setSelect('text')
    setQuestionImgPreview(null)
  }

  const onQuestionImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null

    if (e.target.files && e.target.files.length) {
      setValue('questionImg', e.target.files[0], {
        shouldDirty: true,
        shouldTouch: true,
      })

      if (file && file.size < 4000000) {
        const reader = new FileReader()

        reader.onloadend = () => {
          const file64 = reader.result as string

          setQuestionImgPreview(file64)
        }
        reader.readAsDataURL(file)
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  const onAnswerImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null

    if (e.target.files && e.target.files.length) {
      setValue('answerImg', e.target.files[0], {
        shouldDirty: true,
        shouldTouch: true,
      })

      if (file && file.size < 4000000) {
        const reader = new FileReader()

        reader.onloadend = () => {
          const file64 = reader.result as string

          setAnswerImgPreview(file64)
        }
        reader.readAsDataURL(file)
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
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
          <SelectDemo
            items={['text', 'image']}
            callback={(value: string) => setSelect(value)}
            label="Choose a question format"
          />
          {select === 'text' ? (
            <>
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
            </>
          ) : (
            <div className={s.form__imgs}>
              <div className={s.form__imgs_question}>
                <Subtitle2>Answer:</Subtitle2>
                {questionImgPreview && <img src={questionImgPreview} alt="" />}
                <Controller
                  control={control}
                  name={'questionImg'}
                  render={() => {
                    return (
                      <Fileinput
                        onImgChange={onQuestionImgChange}
                        title={'Change Cover'}
                        id={'questionImg'}
                        className={s.file__input}
                      />
                    )
                  }}
                />
              </div>

              <div className={s.form__imgs_answer}>
                <Subtitle2>Question:</Subtitle2>
                {answerImgPreview && <img src={answerImgPreview} alt="" />}
                <Controller
                  control={control}
                  name={'answerImg'}
                  render={() => {
                    return (
                      <Fileinput
                        onImgChange={onAnswerImgChange}
                        title={'Change Cover'}
                        id={'answerImg'}
                        className={s.file__input}
                      />
                    )
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className={s.form__buttons}>
          <Button
            type="button"
            className={s.form__buttons_cancel}
            variant="secondary"
            callBack={() => {
              setAnswerImgPreview(null)
              setQuestionImgPreview(null)
              reset()
            }}
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

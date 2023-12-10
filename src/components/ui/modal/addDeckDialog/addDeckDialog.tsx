import { ChangeEvent, useState } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

import { useAddDeckMutation } from '../../../../services/decks/decks'
import { Button } from '../../button'
import ControlledCheckbox from '../../controlled/controlled-checkbox'
import Input from '../../input/input'
import Modal from '../modal'

import s from './addDeckDialog.module.scss'

export type AddDeckInputs = {
  name: string
  cover?: /* File */ any
  isPrivate: boolean
}

type AddDeckDialogType = {
  isOpen: boolean
  callBack: (value: boolean) => void
}

const schema = z.object({
  name: z.string().min(3, { message: 'name must be longer than or equal to 3 characters' }),
  cover: z.string() /* instanceof(FileList) */,
  isPrivate: z.boolean(),
})

const AddDeckDialog = ({ isOpen, callBack }: AddDeckDialogType) => {
  const [addDeck] = useAddDeckMutation()

  const [preview, setPreview] = useState<string>()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<AddDeckInputs>({
    resolver: zodResolver(schema),
  })

  function text2Binary(input: string) {
    let binaryResult = ''

    for (let i = 0; i < input.length; i++) {
      const charCode = input.charCodeAt(i)
      let binaryValue = ''

      for (let j = 7; j >= 0; j--) {
        binaryValue += (charCode >> j) & 1
      }

      binaryResult += binaryValue + ' '
    }

    return binaryResult.trim()
  }

  function convertToBase64(string: string) {
    // Convert string to Base64
    var base64String = btoa(string)

    return base64String
  }

  const onSubmit: SubmitHandler<AddDeckInputs> = data => {
    const { name, isPrivate, cover } = data

    addDeck({ name, isPrivate, cover: convertToBase64(cover) })
    reset()
    callBack(false)
  }

  const handleUploadedFile = (event: any) => {
    const file = event.target.files[0]

    const urlImage = URL.createObjectURL(file)

    setPreview(urlImage)
  }

  /*  const onChangeHandler = handleSubmit((data: Form) => {
    const form = new FormData()

    form.append('avatar', data.avatar ?? '')
    form.append('name', me?.name ?? '')
    updateAvatar(form)
  }) */

  //logic to close the modal when clicked outside

  const imageSrc = getValues().cover /* ?.[0] */

  // console.log(preview)

  return (
    <Modal isOpen={isOpen} callBack={callBack}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />

        <div className={s.form__header}>
          <h3>Add New Pack</h3>
          <button onClick={() => callBack(false)}>X</button>
        </div>
        <div className={s.form__functionality}>
          <div className={s.form__functionality_cover}>
            <img
              src={
                imageSrc /* preview */
                  ? imageSrc /* preview */
                  : 'https://s3-alpha-sig.figma.com/img/796f/62d9/8f77a51611a552cfd42b1ec2f4c1e4c6?Expires=1702252800&Signature=amS~V9x15hbUXhFxc4pxLLvHRa55nPRumUmBmoSTkwdhhfb1xOQYo6GNPg5Vrl4mXJDaYFyuRTIdTf0425TzOT7W6h1wzednx75E46r1b8qY1K503DKSvLSzfPWyaSPUYLAuPP8IX5F9~chJgjnsm4fZfUB0cy0BDBh-Y6fqnVS3z5BMMnNq1o5-QZ-m33Kk6kMnl2vmsolV-Xha4P~3ZxbsmDkZU~LZDOWbzkoCmVnVL-NrRZkxvYp9SgXee~wqT94Xkrq~p7A8~MpqzTHW4slalSg29Lqu~jVOsPuYS3-GEvYP2qszfUxExY7UEy2HX9tHaxIn-X2y~v8amb7XjQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
              }
            />
            <div className={s.file}>
              <label htmlFor={'cover'} className={s.file__label}>
                Change Cover
              </label>
              {
                <input
                  {...(register('cover'),
                  {
                    onChange: e => {
                      handleUploadedFile(e)
                      e.target.files &&
                        setValue('cover', URL.createObjectURL(e.target.files[0]), {
                          shouldDirty: true,
                          shouldTouch: true,
                        })
                    },
                  })}
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
            Add New Pack
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddDeckDialog

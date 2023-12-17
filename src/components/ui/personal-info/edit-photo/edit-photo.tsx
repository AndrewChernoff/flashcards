import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { any, z } from 'zod'

import { usePatchMeMutation } from '../../../../services/auth/auth'
import { Button } from '../../button'
import { H2 } from '../../typography/typography'

import s from './edit-photo.module.scss'

type EditPhotoPropsType = {
  userAva: string
}
type FormValues = {
  avatar: File
}
const EditPhoto = ({ userAva }: EditPhotoPropsType) => {
  const [patchMe] = usePatchMeMutation()

  const SignUpSchema = z.object({
    avatar: z.instanceof(FileList),
  })

  const {
    register,
    control,

    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(SignUpSchema),
  })

  const onSubmit = (data: any) => {
    console.log('Form submitted!', data)
    const formData = new FormData()

    formData.append('avatar', data.avatar[0])
    console.log(formData)

    patchMe(formData)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <H2>Personal Information</H2>

      <img src={userAva} alt="user ava" className={s.form__img} />
      <DevTool control={control} />
      {
        <label htmlFor={'avatar'} className={s.file__label}>
          Change Cover
          <input
            {...register('avatar')}
            /* onChange={e => {
              e.target.files &&
                setValue('avatar', e.target.files[0], {
                  shouldDirty: true,
                  shouldTouch: true,
                })
            }} */
            type={'file'}
            className={s.file__input}
            id={'avatar'}
            name="avatar"
          />
        </label>
      }

      <Button type="submit" variant={'purple'} className={s.form__button} fullWidth={true}>
        Save Changes
      </Button>
    </form>
  )
}

export default EditPhoto

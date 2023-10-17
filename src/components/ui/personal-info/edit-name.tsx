import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../button'
import Input from '../input/input'

import s from './edit-name.module.scss'

type FormValues = {
  nickname: string
}

const EditName = () => {
  const SignUpSchema = z.object({
    nickname: z.string().min(2).max(20),
  })

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ resolver: zodResolver(SignUpSchema) })

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data))
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={s.form__title}>Personal Information</h2>

      <div /* className={s.info__imgBlock}  */>
        <img src="https://avatars.githubusercontent.com/u/79928353?v=4" />
      </div>
      <DevTool control={control} />
      <Input
        isSearch={false}
        placeholder={''}
        type={'text'}
        error={errors.nickname?.message}
        isDisabled={false}
        {...register('nickname')}
        label={'Nickname'}
      />

      <Button
        type="submit"
        //callBack={changeToEdit}
        variant={'secondary'}
        className={s.form__button}
        fullWidth={true}
      >
        Save Changes
      </Button>
    </form>
  )
}

export default EditName

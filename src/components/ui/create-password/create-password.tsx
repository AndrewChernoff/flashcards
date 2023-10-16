import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../button'
import Card from '../card/card'
import Input from '../input/input'

import s from './create-password.module.scss'

type InputPAsswordType = {
  password: string
}

const CreatePassword = () => {
  const SignUpSchema = z.object({
    password: z.string().min(3).max(20),
  })

  type SignUpSchemaType = z.infer<typeof SignUpSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) })
  const onSubmit: SubmitHandler<InputPAsswordType> = data => alert(JSON.stringify(data))

  return (
    <Card>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={s.form__title}>Create new password</h2>

        <Input
          className={s.form__input}
          isSearch={false}
          placeholder={'Type your password'}
          type={'password'}
          error={errors.password?.message}
          isDisabled={false}
          {...register('password')}
          label={'Password'}
          name={'password'}
        />

        <h3 className={s.form__subtitle}>
          Create new password and we will send you further instructions to email
        </h3>

        <Button type="submit" variant={'tertiary'} className={s.form__button} fullWidth={true}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}

export default CreatePassword

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { useRecoverPasswordMutation } from '../../../services/auth/auth'
import { Button } from '../button'
import Card from '../card/card'
import Input from '../input/input'

import s from './forgot-password.module.scss'

type InputPAsswordType = {
  email: string
}

const ForgotPassword = () => {
  const SignUpSchema = z.object({
    email: z
      .string()
      .min(1, { message: 'This field has to be filled.' })
      .email('This is not a valid email.'),
  })

  type SignUpSchemaType = z.infer<typeof SignUpSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) })

  const [recoverPassword] = useRecoverPasswordMutation()

  const onSubmit: SubmitHandler<InputPAsswordType> = data => recoverPassword(data)

  return (
    <Card className={s.card}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={s.form__title}>Forgot your password?</h2>

        <Input
          className={s.form__input}
          isSearch={false}
          placeholder={'email'}
          type={'text'}
          error={errors.email?.message}
          isDisabled={false}
          {...register('email')}
          label={'Email'}
        />

        <h3 className={s.form__subtitle}>
          Enter your email address and we will send you further instructions
        </h3>

        <Button type="submit" variant={'tertiary'} className={s.form__button} fullWidth={true}>
          Send Instructions
        </Button>
        <Link to="/signin">Try logging in</Link>
      </form>
    </Card>
  )
}

export default ForgotPassword

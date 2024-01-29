import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button } from '../../components/ui/button'
import Card from '../../components/ui/card/card'
import Input from '../../components/ui/input/input'
import { Body2 } from '../../components/ui/typography/typography'

import s from './forgot-password.module.scss'

import { useRecoverPasswordMutation } from '@/services/auth/auth'

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
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) })

  const [recoverPassword, { isSuccess, error }] = useRecoverPasswordMutation()

  const onSubmit: SubmitHandler<InputPAsswordType> = data => {
    recoverPassword(data)
    reset()
  }

  if (isSuccess) {
    toast.success('You will recieve email message for recovering your password', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }
  if (error) {
    toast.error('Something went wrong!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }

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

        <Body2 className={s.form__subtitle}>
          Enter your email address and we will send you further instructions
        </Body2>

        <Button type="submit" variant={'tertiary'} className={s.form__button} fullWidth={true}>
          Send Instructions
        </Button>
        <Link to="/" className={s.form__link}>
          Try logging in
        </Link>
      </form>
    </Card>
  )
}

export default ForgotPassword

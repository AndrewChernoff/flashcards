import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useResetPasswordMutation } from '../../../services/auth/auth'
import { Button } from '../button'
import Card from '../card/card'
import Input from '../input/input'

import s from './create-password.module.scss'

type InputPAsswordType = {
  password: string
}

const SignUpSchema = z.object({
  password: z.string().min(3).max(20),
})

type SignUpSchemaType = z.infer<typeof SignUpSchema>

const CreatePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) })

  const { token } = useParams()
  const navigate = useNavigate()

  const [resetPassword, { isSuccess, error }] = useResetPasswordMutation()

  const onSubmit: SubmitHandler<InputPAsswordType> = data => {
    token && resetPassword({ password: data.password, token })
    reset()
  }

  if (isSuccess) {
    toast.success('Password is reset. Try to sign in', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
    navigate('/signin')
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

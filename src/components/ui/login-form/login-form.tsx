import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { z } from 'zod'

import {
  useGetMeQuery,
  useLogInMutation,
  useRecoverPasswordMutation,
} from '../../../services/auth/auth'
import { Button } from '../button'
import Card from '../card/card'
import ControlledCheckbox from '../controlled/controlled-checkbox'
import Input from '../input/input'

import s from './login-form.module.scss'

export type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const { data: me } = useGetMeQuery()

  const [logIn] = useLogInMutation()
  const [recoverPassword] = useRecoverPasswordMutation()

  const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(20),
    rememberMe: z.boolean().optional(),
  })

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormValues>({ resolver: zodResolver(SignUpSchema) })

  const onSubmit = (formData: FormValues) => {
    logIn(formData)
  }

  if (me && me?.success !== false) return <Navigate to={'/decks'} />

  return (
    <Card className={s.card}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <h2 className={s.form__title}> Sign In</h2>
        <Input
          className={s.form__input}
          isSearch={false}
          placeholder={'Type your email'}
          type={'text'}
          error={errors.email?.message}
          isDisabled={false}
          {...register('email')}
          label={'email'}
        />

        <Input
          className={s.form__input}
          isSearch={false}
          placeholder={'Type your password'}
          type={'password'}
          error={errors.password?.message}
          isDisabled={false}
          {...register('password')}
          label={'password'}
        />

        <ControlledCheckbox
          className={s.form__checkbox}
          name={'rememberMe'}
          label={'Remember me'}
          id={'rememberMe'}
          control={control}
        />

        <Link to="/recover-password" className={s.form__frogot} onClick={recoverPassword}>
          Forgot Password?
        </Link>

        <Button type="submit" variant={'tertiary'} className={s.form__button} fullWidth={true}>
          Sign In
        </Button>

        <h3 className={s.form__question}>Don&apos;t have an account?</h3>

        <Button variant="link" as={'a'} className={s.form__link} href={'/signup'} type="submit">
          Sign Up
        </Button>
      </form>
    </Card>
  )
}

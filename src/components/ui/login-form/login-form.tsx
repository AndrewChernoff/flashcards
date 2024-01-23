import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button } from '../button'
import Card from '../card/card'
import ControlledCheckbox from '../controlled/controlled-checkbox'
import Input from '../input/input'

import s from './login-form.module.scss'

import { useGetMeQuery, useLogInMutation } from '@/services/auth/auth'

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error && 'data' in error
}

type LogInError = {
  statusCode: number
  message: string
  timestamp: string
  path: string
}

export type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const { data: me } = useGetMeQuery()

  const [logIn, { error: logInError }] = useLogInMutation()

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

  if (logInError) {
    if (isFetchBaseQueryError(logInError)) {
      toast.error((logInError.data as LogInError).message, {
        toastId: 'loginError',
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }

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

        <Link to="/recover-password" className={s.form__frogot}>
          Forgot Password?
        </Link>

        <Button type="submit" variant={'tertiary'} className={s.form__button} fullWidth={true}>
          Sign In
        </Button>

        <h3 className={s.form__question}>Don&apos;t have an account?</h3>

        <Link className={s.form__link} to={'/signup'}>
          Sign Up
        </Link>
      </form>
    </Card>
  )
}

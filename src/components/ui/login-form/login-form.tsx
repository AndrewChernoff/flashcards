import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../button'
import Card from '../card/card'
import ControlledCheckbox from '../controlled/controlled-checkbox'
import Input from '../input/input'

import s from './login-form.module.scss'

import { useLogInMutation } from '@/services/sign-in/sign-in'

export type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const { data, error, isLoading } = useLogInMutation()

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

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data))
  }

  return (
    <Card>
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
        {/* <ControlledInput
          className={s.form__input}
          isSearch={false}
          placeholder={'Type your password'}
          type={'password'}
          error={errors.password?.message}
          isDisabled={false}
          {...register('password')}
          label={'password'}
          control={control}
        /> */}

        <ControlledCheckbox
          className={s.form__checkbox}
          name={'rememberMe'}
          label={'Remember me'}
          id={'rememberMe'}
          control={control}
        />

        <h2 className={s.form__frogot}>Forgot Password?</h2>

        <Button type="submit" variant={'tertiary'} className={s.form__button} fullWidth={true}>
          Sign In
        </Button>

        <h3 className={s.form__question}>Don&apos;t have an account?</h3>

        <Button
          variant="link"
          as={'a'}
          className={s.form__link}
          href={'https://api.flashcards.andrii.es/docs#/Auth/AuthController_registration'}
          type="submit"
          //fullWidth={true}
        >
          Sign Up
        </Button>
      </form>
    </Card>
  )
}

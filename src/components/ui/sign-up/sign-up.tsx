import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '../button'
import Card from '../card/card'
import Input from '../input/input'
import { H2 } from '../typography/typography'

import s from './sign-up.module.scss'

import { useSignupMutation } from '@/services/auth/auth'

type SignUpFormValues = {
  email: string
  password: string
  passwordConfirmation: string
}

function SignUp() {
  const [signup /* , { error } */] = useSignupMutation()

  const SignUpSchema = z
    .object({
      email: z.string().email(),
      password: z.string().min(3).max(20),
      passwordConfirmation: z.string().min(3).max(20),
    })
    .refine(
      values => {
        return values.password === values.passwordConfirmation
      },
      {
        message: 'Passwords must match!',
        path: ['passwordConfirmation'],
      }
    )

  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm<SignUpFormValues>({ resolver: zodResolver(SignUpSchema) })

  const onSubmit = (formData: SignUpFormValues) => {
    signup({ email: formData.email, password: formData.password })
  }

  return (
    <Card className={s.card}>
      <DevTool control={control} />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <H2 className={s.form__title}> Sign Up</H2>
        <Input
          className={s.form__input}
          isSearch={false}
          placeholder={'Type your email'}
          type={'text'}
          error={errors.email?.message}
          isDisabled={false}
          {...register('email')}
          label={'Email'}
        />

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

        <Input
          className={s.form__input}
          isSearch={false}
          placeholder={'Confirm Password'}
          type={'password'}
          error={errors.passwordConfirmation?.message}
          isDisabled={false}
          {...register('passwordConfirmation')}
          label={'Confirm Password'}
        />

        <Button type="submit" className={s.form__button} variant={'tertiary'} fullWidth={true}>
          Sign Up
        </Button>

        <h3>Already have an account?</h3>

        <Link className={s.form__link} to={'/'}>
          Sign In
        </Link>
      </form>
    </Card>
  )
}

export default SignUp

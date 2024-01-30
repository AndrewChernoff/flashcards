import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button } from '../../components/ui/button'
import Card from '../../components/ui/card/card'
import Input from '../../components/ui/input/input'
import { H2 } from '../../components/ui/typography/typography'

import s from './sign-up.module.scss'

import { isFetchBaseQueryError } from '@/common/utils/isFetchBAseQueryError'
import { useSignupMutation } from '@/services/auth/auth'

type SignUpError = {
  data: {
    errorMessages: Array<string>
  }
  status: 400
}

type SignUpFormValues = {
  email: string
  password: string
  passwordConfirmation: string
}

function SignUp() {
  const [signup, { error: signUpError, isSuccess }] = useSignupMutation()

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

  if (signUpError) {
    if (isFetchBaseQueryError(signUpError)) {
      toast.error((signUpError as SignUpError).data.errorMessages[0], {
        toastId: 'signUpError',
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

  if (isSuccess) {
    toast.success('Successfully registered. Try to sign in', {
      toastId: 'signup',
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

        <Input
          className={s.form__input}
          isSearch={false}
          placeholder={'Confirm Password'}
          type={'password'}
          error={errors.passwordConfirmation?.message}
          isDisabled={false}
          {...register('passwordConfirmation')}
          label={'confirm password'}
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

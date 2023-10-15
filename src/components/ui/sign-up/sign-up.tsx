import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../button'
import Card from '../card/card'
import Input from '../input/input'

import s from './sign-up.module.scss'

type SignUpFormValues = {
  email: string
  password: string
  subject: boolean //confirm password
}

function SignUp() {
  const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(20),
    subject: z.string().min(3).max(20),
  })

  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm<SignUpFormValues>({ resolver: zodResolver(SignUpSchema) })

  const onSubmit = (data: SignUpFormValues) => {
    alert(JSON.stringify(data))
  }

  return (
    <Card>
      <DevTool control={control} />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={s.form__title}> Sign Up</h2>
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
          error={errors.password?.message}
          isDisabled={false}
          {...register('subject')}
          label={'Confirm Password'}
        />

        <Button type="submit" className={s.form__button} variant={'tertiary'} fullWidth={true}>
          Sign Up
        </Button>

        <h3>Already have an account?</h3>

        <Button
          variant="link"
          as={'a'}
          className={s.form__link}
          href={'https://api.flashcards.andrii.es/docs#/Auth/AuthController_registration'}
          type="submit"
          //fullWidth={true}
        >
          Sign In
        </Button>
      </form>
    </Card>
  )
}

export default SignUp

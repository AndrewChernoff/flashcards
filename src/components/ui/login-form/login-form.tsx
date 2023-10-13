import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../button'
import ControlledCheckbox from '../controlled/controlled-checkbox'
import Input from '../input/input'

export type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <Input
        isSearch={false}
        placeholder={'Type your email'}
        type={'text'}
        error={errors.email?.message}
        isDisabled={false}
        {...register('email')}
        label={'email'}
      />

      <Input
        isSearch={false}
        placeholder={'Type your password'}
        type={'password'}
        error={errors.password?.message}
        isDisabled={false}
        {...register('password')}
        label={'password'}
      />

      <ControlledCheckbox
        name={'rememberMe'}
        label={'Remember me'}
        id={'rememberMe'}
        control={control}
      />

      <Button type="submit">Submit</Button>
    </form>
  )
}

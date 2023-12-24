import { forwardRef, useEffect } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { usePatchMeMutation } from '../../../../services/auth/auth'
import { Button } from '../../button'
import Input from '../../input/input'
import { H2 } from '../../typography/typography'

import s from './edit-name.module.scss'

type EditNameProps = {
  onInputNameBlur: () => void
  name: string
  ava: string
}

type FormValues = {
  name: string
}

const EditName = forwardRef<HTMLInputElement, EditNameProps>(
  ({ onInputNameBlur, name, ava }, ref) => {
    const [patchMe] = usePatchMeMutation()

    const SignUpSchema = z.object({
      name: z.string().min(3).max(20),
    })

    const {
      register,
      control,
      formState: { errors },
      handleSubmit,
    } = useForm<FormValues>({
      resolver: zodResolver(SignUpSchema),
      defaultValues: {
        name: name, ///from props
      },
    })

    const onSubmit = (data: FormValues) => {
      if (data.name === name) {
        /*if current name equals to name we type in input we use onBlur for avoiding spare request*/
        onInputNameBlur()

        return
      }
      patchMe(data)
      onInputNameBlur()
    }

    useEffect(() => {
      if (ref && 'current' in ref) {
        ref && ref.current?.focus()
      }
    }, [])

    return (
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.container}>
          <H2 className={s.form__title}>Personal Information</H2>

          <div /* className={s.info__imgBlock}  */>
            <img src={ava} alt="user ava" />
          </div>
          <DevTool control={control} />
          <Input
            isSearch={false}
            placeholder={''}
            type={'text'}
            error={errors.name?.message}
            isDisabled={false}
            {
              ...register('name') /* ,
        {
          onBlur: () => onInputNameBlur(),
        } */
            }
            label={'Nickname'}
            //ref={ref}
          />

          <Button
            type="submit"
            // callBack={onInputNameBlur}
            variant={'secondary'}
            className={s.form__button}
            fullWidth={true}
          >
            Save Changes
          </Button>
        </div>
      </form>
    )
  }
)

export default EditName

import { Control, UseControllerProps, useController } from 'react-hook-form'
import { string } from 'zod'

import Input, { InputProps } from '../input/input'
import { FormValues } from '../login-form/login-form'

export type ControlledInputProps = InputProps & {
  control: Control<FormValues>
  name: keyof FormValues
}

const ControlledInput = (props: ControlledInputProps) => {
  const { field } = useController(props)

  console.log(props)

  return (
    <>
      <Input
        /* name={name}
        isSearch={isSearch}
        placeholder={placeholder}
        type={type}
        error={error}
        isDisabled={isDisabled}
        label={label}
        {...rest} */
        //name={props.name}
        isSearch={props.isSearch}
        placeholder={props.placeholder}
        type={props.type}
        error={props.error}
        isDisabled={props.isDisabled}
        label={props.label}
        {...field}
      />
    </>
  )
}

export default ControlledInput

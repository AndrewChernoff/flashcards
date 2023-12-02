import { UseControllerProps, useController } from 'react-hook-form'

import CheckboxDemo, { CheckboxProps } from '../chekbox/checkbox'
import { FormValues } from '../login-form/login-form'
import { AddDeckInputs } from '../modal/addDeckDialog/addDeckDialog'

export type ControlledCheckboxProps<T extends FormValues | AddDeckInputs> = UseControllerProps<T> &
  Omit<CheckboxProps, 'onCheckedChange' | 'value' | 'checked'>

const ControlledCheckbox = <T extends FormValues | AddDeckInputs>({
  className,
  id,
  label,
  control,
  name,
}: ControlledCheckboxProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    //defaultValue: false,
  })

  return (
    <CheckboxDemo
      className={className}
      id={id}
      label={label}
      checked={Boolean(value)}
      onCheckedChange={onChange}
    />
  )
}

export default ControlledCheckbox

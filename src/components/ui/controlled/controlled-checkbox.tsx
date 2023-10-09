import { UseControllerProps, useController } from 'react-hook-form'

import CheckboxDemo, { CheckboxProps } from '../chekbox/checkbox'
import { FormValues } from '../login-form/login-form'

export type ControlledCheckboxProps<T extends FormValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'onCheckedChange' | 'value' | 'checked'>

const ControlledCheckbox = ({ id, label, control, name }: ControlledCheckboxProps<FormValues>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: false,
  })

  return <CheckboxDemo id={id} label={label} checked={Boolean(value)} onCheckedChange={onChange} />
}

export default ControlledCheckbox

import { UseControllerProps, useController } from 'react-hook-form'

import CheckboxDemo, { CheckboxProps } from '../chekbox/checkbox'
import { FormValues } from '../../../pages/signin/signin'
import { AddDeckInputs } from '../modal/add-deck-dialog/add-deck-dialog'

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
    defaultValue: false as any,
    name,
    control,
  })

  return (
    <CheckboxDemo
      className={className}
      id={id}
      label={label}
      checked={value as boolean}
      onCheckedChange={onChange}
    />
  )
}

export default ControlledCheckbox

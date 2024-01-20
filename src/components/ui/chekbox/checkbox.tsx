import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

export interface CheckboxProps {
  label: string
  id: string
  checked: boolean
  onCheckedChange: (value: boolean) => void
  className?: string
}

const CheckboxDemo = ({ className, id, label, checked, onCheckedChange }: CheckboxProps) => {
  const checkboxBackground = checked ? 'white' : '#333'

  const checkboxClassname = className ? `${s.checkbox} ${className}` : s.checkbox

  return (
    <div className={checkboxClassname}>
      <div className={s.wrapper}>
        <Checkbox.Root
          className={s.checkboxRoot}
          checked={checked}
          onCheckedChange={onCheckedChange}
          style={{ backgroundColor: checkboxBackground }}
          id={id}
        >
          <Checkbox.Indicator className={s.checkboxIndicator}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default CheckboxDemo

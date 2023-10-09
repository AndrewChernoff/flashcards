import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

export interface CheckboxProps {
  label: string
  id: string
  checked: boolean
  onCheckedChange: (value: boolean) => void
}

const CheckboxDemo = ({ id, label, checked, onCheckedChange }: CheckboxProps) => {
  const checkboxBackground = checked ? 'white' : 'black'

  return (
    <div className={s.checkbox}>
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
      <p>{label}</p>
    </div>
  )
}

export default CheckboxDemo

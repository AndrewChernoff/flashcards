import { forwardRef, useState } from 'react'

import * as Select from '@radix-ui/react-select'
import { styled } from '@stitches/react'

import s from './select.module.scss'

type SelectProps = {
  items: string[]
  label?: string
  callback: (value: string) => void
  className?: string
}

const SelectDemo = ({ items, label, className, callback }: SelectProps) => {
  const [toggled, setToggled] = useState('closed')

  const handleValueChange = (newValue: string) => {
    callback(newValue)
  }

  const triggerClassName = className ? `${s.select__trigger} ${className}` : s.select__trigger

  return (
    <div className={s.select}>
      {label && <p className={s.select__label}>{label}</p>}
      <Select.Root
        // open={true}
        defaultValue={items?.[0]}
        onOpenChange={e => setToggled(e === true ? 'open' : 'closed')}
        onValueChange={handleValueChange}
      >
        <Select.Trigger asChild data-state={toggled} className={triggerClassName}>
          <button>
            <span>
              <Select.Value />
            </span>
            <Select.Icon asChild>
              <Chevron direction="down" />
            </Select.Icon>
          </button>
        </Select.Trigger>

        <Select.Content asChild className={s.select__content} position="popper">
          <Select.Viewport>
            {items.map((item, i) => {
              return (
                <Select.Item key={i} value={item} className={s.select__content_item}>
                  <Select.ItemText> {item} </Select.ItemText>
                </Select.Item>
              )
            })}
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  )
}

const Chev = styled('svg', {
  transition: 'transform 300ms',
  variants: {
    direction: {
      up: {
        transform: 'rotate(-90deg)',
        '[data-state=open] > &': { transform: 'rotate(90deg)' },
      },
      down: {
        transform: 'rotate(90deg)',
        '[data-state=open] > &': { transform: 'rotate(-90deg)' },
      },
      left: {
        transform: 'rotate(180deg)',
        '[data-state=open] > &': { transform: 'rotate(0deg)' },
      },
      right: {
        transform: 'rotate(0deg)',
        '[data-state=open] > &': { transform: 'rotate(180deg)' },
      },
    },
  },
  defaultVariants: {
    direction: 'right',
  },
})

type ChevronTypes = {
  direction?: 'up' | 'down' | 'left' | 'right'
  width?: number
  props?: any
}

const Chevron = forwardRef(({ width = 8, ...props }: ChevronTypes, ref) => (
  <Chev {...ref} viewBox="0 0 8 13" fill="none" style={{ width: width, height: 'auto' }} {...props}>
    <path d="M1.41.815 0 2.225l4.58 4.59L0 11.405l1.41 1.41 6-6-6-6Z" fill="#fff" />
  </Chev>
))

Chevron.displayName = 'Chevron'

export default SelectDemo

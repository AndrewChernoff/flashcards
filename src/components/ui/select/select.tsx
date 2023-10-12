import { forwardRef, useState } from 'react'

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'
import { styled } from '@stitches/react'
import classnames from 'classnames'

import './select.scss'

const items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

const SelectDemo = () => {
  const [toggled, setToggled] = useState('closed')

  debugger

  return (
    <Select.Root
      // open={true}
      defaultValue={items?.[0]}
      onOpenChange={e => setToggled(e === true ? 'open' : 'closed')}
    >
      <Select.Trigger asChild data-state={toggled} className="SelectTrigger">
        <button /* error={!!error} */>
          <span>
            <Select.Value />
          </span>
          <Select.Icon asChild>
            <Chevron direction="down" />
          </Select.Icon>
        </button>
      </Select.Trigger>

      {/*       <div className="Width">fgdgfd</div>*/}
      <Select.Content asChild className="Content" position="popper" /* className="Dropdown" */>
        <Select.Viewport className="Dropdown">
          {items.map((item, i) => {
            return (
              <Select.Item key={i} value={item} className={'Item'}>
                <Select.ItemText> {item} </Select.ItemText>
              </Select.Item>
            )
          })}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
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

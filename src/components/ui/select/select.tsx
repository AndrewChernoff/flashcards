import { useState } from 'react'

import * as Radix from '@radix-ui/react-select'

import { SelTrigger, Dropdown, Wrapper, Viewport, Item } from './select_addition/select-components'
import Chevron from './select_addition/shevron'

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

const error = null

const Select = () => {
  const [toggled, setToggled] = useState('closed')

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: 10,
      }}
    >
      <form style={{ width: '100%', maxWidth: 420 }}>
        <Wrapper>
          <Radix.Root
            dir="ltr"
            //open={true}

            defaultValue={items?.[0]}
            onOpenChange={e => setToggled(e === true ? 'open' : 'closed')}
          >
            <Radix.Trigger asChild data-state={toggled}>
              <SelTrigger error={!!error}>
                <span>
                  <Radix.Value />
                </span>
                <Radix.Icon asChild>
                  <Chevron direction="down" />
                </Radix.Icon>
              </SelTrigger>
            </Radix.Trigger>
            <Radix.Content asChild>
              <Dropdown style={{ marginTop: '40px' }}>
                <Viewport>
                  {items.map((item, i) => {
                    return (
                      <Item key={i} value={item}>
                        <Radix.ItemText> {item} </Radix.ItemText>
                      </Item>
                    )
                  })}
                </Viewport>
              </Dropdown>
            </Radix.Content>
          </Radix.Root>
        </Wrapper>
      </form>
    </div>
  )
}

export default Select

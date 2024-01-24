import * as Tab from '@radix-ui/react-tabs'

import { TabValue } from '../../../pages/decks/decks'

import s from './tabs.module.scss'

interface SwitcherProps {
  tabValue: TabValue
  onTabValueChange: (value: TabValue) => void
}

const Tabs = ({ tabValue, onTabValueChange }: SwitcherProps) => {
  let qwert: any[] = [
    { name: 'My decks', id: 1 },
    { name: 'All decks', id: 2 },
  ]

  return (
    <Tab.Root
      className={s.TabsRoot}
      defaultValue={tabValue}
      onValueChange={e => onTabValueChange(e as TabValue)}
    >
      <Tab.List className={s.TabsList}>
        {qwert.map(el => {
          return (
            <Tab.Trigger className={s.TabsTrigger} value={el.name} key={`${el.id} tab`}>
              {el.name}
            </Tab.Trigger>
          )
        })}
      </Tab.List>
    </Tab.Root>
  )
}

export default Tabs

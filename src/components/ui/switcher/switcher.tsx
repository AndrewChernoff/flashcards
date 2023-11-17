import * as Tabs from '@radix-ui/react-tabs'

import { TabValue } from '../../../pages/decks/decks'

import s from './switcher.module.scss'

interface SwitcherProps {
  tabValue: TabValue
  onTabValueChange: (value: TabValue) => void
}

const Switcher = ({ tabValue, onTabValueChange }: SwitcherProps) => {
  let qwert: any[] = [
    { name: 'All cards', id: 1 },
    { name: 'My cards', id: 2 },
  ]

  return (
    <Tabs.Root
      className={s.TabsRoot}
      defaultValue={tabValue}
      onValueChange={e => onTabValueChange(e as TabValue)}
    >
      <Tabs.List className={s.TabsList}>
        {qwert.map(el => {
          return (
            <>
              <Tabs.Trigger className={s.TabsTrigger} value={el.name}>
                {el.name}
              </Tabs.Trigger>
              {/* <Tabs.Trigger className={s.TabsTriqgger} value="tab2">
                Password
              </Tabs.Trigger> */}
            </>
          )
        })}
        {/* <Tabs.Trigger className={s.TabsTrigger} value="tab1">
          Account
        </Tabs.Trigger>
        <Tabs.Trigger className={s.TabsTrigger} value="tab2">
          Password
        </Tabs.Trigger> */}
      </Tabs.List>
      {/*    <Tabs.Content className="TabsContent" value="tab1">
        <p className="Text">Make changes to your account here. Click save when you're done.</p>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="name">
            Name
          </label>
          <input className="Input" id="name" defaultValue="Pedro Duarte" />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="username">
            Username
          </label>
          <input className="Input" id="username" defaultValue="@peduarte" />
        </fieldset>
        <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="Button green">Save changes</button>
        </div>
      </Tabs.Content>
      <Tabs.Content className="TabsContent" value="tab2">
        <p className="Text">Change your password here. After saving, you'll be logged out.</p>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="currentPassword">
            Current password
          </label>
          <input className="Input" id="currentPassword" type="password" />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="newPassword">
            New password
          </label>
          <input className="Input" id="newPassword" type="password" />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input className="Input" id="confirmPassword" type="password" />
        </fieldset>
        <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="Button green">Change password</button>
        </div>
      </Tabs.Content> */}
    </Tabs.Root>
  )
}

export default Switcher

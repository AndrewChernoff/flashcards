import type { Meta, StoryObj } from '@storybook/react'

import Tabs from './tabs'

const meta = {
  title: 'Components/Switcher',
  component: Tabs,
  tags: ['autodocs'],
  /* argTypes: {
     isAuth: {
      control: { type: 'radio' },
    },
  }, */
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const TabsItems: Story = {
  args: {
    tabValue: 'All decks',
  },
}

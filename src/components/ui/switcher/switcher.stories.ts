import type { Meta, StoryObj } from '@storybook/react'

import Switcher from './switcher'

const meta = {
  title: 'Components/Switcher',
  component: Switcher,
  tags: ['autodocs'],
  /* argTypes: {
     isAuth: {
      control: { type: 'radio' },
    },
  }, */
} satisfies Meta<typeof Switcher>

export default meta
type Story = StoryObj<typeof meta>

export const Switch: Story = {
  args: {
    tabValue: 'All cards',
  },
}

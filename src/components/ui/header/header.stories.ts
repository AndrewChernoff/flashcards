import type { Meta, StoryObj } from '@storybook/react'

import Header from './header'

const meta = {
  title: 'Components/Button',
  component: Header,
  tags: ['autodocs'],
  /* argTypes: {
     isAuth: {
      control: { type: 'radio' },
    },
  }, */
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const AuthHeader: Story = {
  args: {
    isAuth: true,
  },
}

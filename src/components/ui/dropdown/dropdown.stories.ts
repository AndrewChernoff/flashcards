import type { Meta, StoryObj } from '@storybook/react'

import Dropdown from './dropdown'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Dropdown>

export const DropDownShow: Story = {
  args: {
    children: 'Child',
  },
}

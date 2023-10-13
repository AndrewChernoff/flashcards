import type { Meta, StoryObj } from '@storybook/react'

import SelectDemo from './select'

const meta = {
  title: 'Components/Select',
  component: SelectDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof SelectDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Select: Story = {
  args: {
    label: 'Select',
    items: ['select', 'you', 'sfdf'],
  },
}

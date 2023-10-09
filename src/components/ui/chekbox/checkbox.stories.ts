import type { Meta, StoryObj } from '@storybook/react'

import CheckboxDemo from './checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: CheckboxDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxDemo>

export default meta
type Story = StoryObj<typeof meta>

export const JustCheckbox: Story = {
  args: {
    id: 'ID',
    label: 'I accept',
    checked: false,
  },
}

import type { Meta, StoryObj } from '@storybook/react'

import RadioGroup from './radio-group'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const RadioGroupDemo: Story = {
  args: {
    isDisabled: false,
  },
}

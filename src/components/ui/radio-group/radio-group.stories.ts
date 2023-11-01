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
    items: [
      { title: 'HTML', id: 1 },
      { title: 'CSS', id: 2 },
      { title: 'JS', id: 3 },
      { title: 'React', id: 4 },
      { title: 'Redux', id: 5 },
    ],
  },
}

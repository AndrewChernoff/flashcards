import type { Meta, StoryObj } from '@storybook/react'

import Input from './input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  /* argTypes: {
     isAuth: {
      control: { type: 'radio' },
    },
  }, */
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const SimpleInput: Story = {
  args: {
    isSearch: false,
    type: 'text',
    label: 'Input',
    placeholder: 'Input',
    error: false,
    isDisabled: false,
  },
}
export const SearchInput: Story = {
  args: {
    isSearch: true,
    type: 'text',
    label: 'Input',
    placeholder: 'Input',
    error: false,
    isDisabled: false,
  },
}

export const ErrorInput: Story = {
  args: {
    isSearch: true,
    type: 'text',
    label: 'Input',
    placeholder: 'Input',
    error: true,
    isDisabled: false,
  },
}

export const DisabledInput: Story = {
  args: {
    isSearch: true,
    type: 'text',
    label: 'Input',
    placeholder: 'Input',
    error: false,
    isDisabled: true,
  },
}

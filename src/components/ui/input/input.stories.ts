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
    name: 'email',
    isSearch: false,
    type: 'text',
    label: 'email',
    placeholder: 'Input',
    error: 'Some error',
    isDisabled: false,
  },
}
export const SearchInput: Story = {
  args: {
    name: 'password',
    isSearch: true,
    type: 'text',
    label: 'password',
    error: undefined,
    placeholder: 'Input',

    isDisabled: false,
  },
}

export const ErrorInput: Story = {
  args: {
    name: 'email',
    isSearch: true,
    type: 'text',
    label: 'email',
    placeholder: 'Input',
    error: undefined,
    isDisabled: false,
  },
}

export const DisabledInput: Story = {
  args: {
    name: 'email',
    isSearch: true,
    type: 'text',
    label: 'email',
    placeholder: 'Input',
    error: undefined,
    isDisabled: true,
  },
}

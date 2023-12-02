import type { Meta, StoryObj } from '@storybook/react'

import Modal from './addDeckDialog'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Select: Story = {
  args: {
    isOpen: true,
  },
}

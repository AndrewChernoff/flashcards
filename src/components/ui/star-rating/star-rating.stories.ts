import type { Meta, StoryObj } from '@storybook/react'

import StarRating from './star-rating'

const meta = {
  title: 'Components/StarRating',
  component: StarRating,
  tags: ['autodocs'],
} satisfies Meta<typeof StarRating>

export default meta
type Story = StoryObj<typeof meta>

export const Slider: Story = {
  args: { grade: 3 },
}

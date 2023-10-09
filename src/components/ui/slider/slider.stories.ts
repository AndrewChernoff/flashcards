import type { Meta, StoryObj } from '@storybook/react'

import EditableSlider from './slider'

const meta = {
  title: 'Components/Slider',
  component: EditableSlider,
  tags: ['autodocs'],
  /* argTypes: {
     isAuth: {
      control: { type: 'radio' },
    },
  }, */
} satisfies Meta<typeof EditableSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Slider: Story = {
  args: {
    value: [25, 75],
  },
}

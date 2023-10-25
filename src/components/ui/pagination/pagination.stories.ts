import type { Meta, StoryObj } from '@storybook/react'

import Pagination from './pagination'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  /* argTypes: {
     isAuth: {
      control: { type: 'radio' },
    },
  }, */
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const SimplePagination: Story = {
  args: {
    currentPage: 2,
    totalCount: 100,
    pageSize: 10,
    siblingCount: 2, // Add siblingCount property with a value
    className: 'pagination', // Add className property with a value
    onPageChange: function (value) {
      this.currentPage = value // Assign the new value to currentPage
      console.log(this.currentPage)
    },
  },
}

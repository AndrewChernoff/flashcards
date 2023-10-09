import { forwardRef } from 'react'

import { styled } from '@stitches/react'

const Chev = styled('svg', {
  transition: 'transform 300ms',
  variants: {
    direction: {
      up: {
        transform: 'rotate(-90deg)',
        '[data-state=open] > &': { transform: 'rotate(90deg)' },
      },
      down: {
        transform: 'rotate(90deg)',
        '[data-state=open] > &': { transform: 'rotate(-90deg)' },
      },
      left: {
        transform: 'rotate(180deg)',
        '[data-state=open] > &': { transform: 'rotate(0deg)' },
      },
      right: {
        transform: 'rotate(0deg)',
        '[data-state=open] > &': { transform: 'rotate(180deg)' },
      },
    },
  },
  defaultVariants: {
    direction: 'right',
  },
})

const Chevron = forwardRef(({ width = 8, ...props }: ChevronTypes, ref) => (
  <Chev {...ref} viewBox="0 0 8 13" fill="none" style={{ width: width, height: 'auto' }} {...props}>
    <path d="M1.41.815 0 2.225l4.58 4.59L0 11.405l1.41 1.41 6-6-6-6Z" fill="#fff" />
  </Chev>
))

Chevron.displayName = 'Chevron'

type ChevronTypes = {
  direction?: 'up' | 'down' | 'left' | 'right'
  width?: number
  props?: any
}

export default Chevron

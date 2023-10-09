import * as Radix from '@radix-ui/react-select'
import { styled } from '@stitches/react'

const Wrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
})

const SelTrigger = styled('button', {
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  /* width: '100%', */
  boxSizing: 'border-box',
  padding: 16,
  fontSize: 16,
  fontFamily: 'sans-serif',
  border: '1px solid #1b1b1b',
  /* borderRadius: 4, */
  background: '#000000',

  outline: 'none',
  color: '#fff',
  width: '210px',
  height: '36px',
  variants: {
    error: {
      true: {
        borderColor: '#df6c75',
      },
    },
  },

  ':focus': {
    border: '2px solid#2F68CC)',
  },
})

const Dropdown = styled('div', {
  position: 'absolute',
  right: 0,
  boxSizing: 'border-box',
  color: '#fff',
  /* padding: '0 8px', */
  width: '210px',

  fontFamily: 'sans-serif',
  fontSize: 16,

  border: '1px solid #1b1b1b',
  /* borderRadius: 4, */
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  pointerEvents: 'all',
  background: 'red',
})

const Viewport = styled(Radix.Viewport, {
  display: 'flex',
  flexDirection: 'column',
  rowGap: 8,
  background: '#000000',

  ':hover': {
    background: '#382766',
    color: 'rgb(148 179 219)',
  },
})

const Item = styled(Radix.Item, {
  padding: '8px',
  outline: 'none',
  transition: 'background ease 300ms',
  /* borderRadius: 4, */
  /*  background: 'gold', */
  width: '100%', ////
})

export { Dropdown, SelTrigger, Wrapper, Viewport, Item }

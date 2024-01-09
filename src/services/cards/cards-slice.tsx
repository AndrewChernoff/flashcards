import { createSlice } from '@reduxjs/toolkit'

type State = {
  isOpen: boolean
}
const initialState: State = {
  isOpen: false,
}

export const cardsSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    openDialog: state => {
      state.isOpen = true
    },
    closeDialog: state => {
      state.isOpen = false
    },
  },
})

export const { openDialog, closeDialog } = cardsSlice.actions

export default cardsSlice.reducer

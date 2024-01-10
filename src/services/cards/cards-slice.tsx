import { Slice, createSlice } from '@reduxjs/toolkit'

type State = {
  isOpen: boolean
}
const initialState: State = {
  isOpen: false,
}

export const cardsSlice: Slice<State> = createSlice({
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

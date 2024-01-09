import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type State = {
  currentPage: number
}
/*for getting card to learn we need to determine deckId firstly */
const initialState: State = {
  currentPage: 1,
}

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
})

export const { setCurrentPage } = paginationSlice.actions

export default paginationSlice.reducer

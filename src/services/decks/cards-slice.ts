import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type State = {
  deckId: string | null
}
/*for getting card to learn we need to determine deckID firstly */
const initialState: State = {
  deckId: null,
}

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    getDeckdId: (state, action: PayloadAction<string>) => {
      state.deckId = action.payload
    },
  },
})

export const { getDeckdId } = cardSlice.actions

export default cardSlice.reducer

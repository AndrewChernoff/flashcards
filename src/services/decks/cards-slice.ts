import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { DeckItemType } from './types'

type State = {
  deck: DeckItemType | null
}
/*for getting card to learn we need to determine deckID firstly */
const initialState: State = {
  deck: null,
}

export const cardSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    getDeckd: (state, action: PayloadAction<DeckItemType>) => {
      state.deck = action.payload
    },
  },
})

export const { getDeckd } = cardSlice.actions

export default cardSlice.reducer

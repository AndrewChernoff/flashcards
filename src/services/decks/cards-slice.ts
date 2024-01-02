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
    getDeck: (state, action: PayloadAction<DeckItemType | null>) => {
      state.deck = action.payload
    },
  },
})

export const { getDeck } = cardSlice.actions

export default cardSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { DeckItemType } from './types'

type TabsType = 'All decks' | 'My decks'

type State = {
  deck: DeckItemType | null
  tabValue: TabsType
  itemsPerPage: number
  /* minCardsCount: number
  maxCardsCount: number */
  orderedBy: 'updated-asc' | 'updated-desc'
  sliderValue: number[]
  deckName: string
}

/*for getting card to learn we need to determine deckId firstly */
const initialState: State = {
  deck: null,
  tabValue: 'All decks', ///tabs for decks
  itemsPerPage: 10,
  sliderValue: [0, 50], ////slider range
  deckName: '', /// for searching deck by name
  orderedBy: 'updated-desc',
}

export const deckSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    getDeck: (state, action: PayloadAction<DeckItemType | null>) => {
      state.deck = action.payload
    },
    setTabValue: (state, action: PayloadAction<TabsType>) => {
      state.tabValue = action.payload
    },
    setSliderValue: (state, action: PayloadAction<number[]>) => {
      state.sliderValue = action.payload
    },
    setDeckNameValue: (state, action: PayloadAction<string>) => {
      state.deckName = action.payload
    },
    setOrderedBy: (state, action: PayloadAction<'updated-asc' | 'updated-desc'>) => {
      state.orderedBy = action.payload
    },
  },
})

export const { getDeck, setTabValue, setSliderValue, setDeckNameValue, setOrderedBy } =
  deckSlice.actions

export default deckSlice.reducer

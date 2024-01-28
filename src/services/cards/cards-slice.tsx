import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit'

type State = {
  deckId: string | null
  isOpen: boolean
  title: string
  orderBy: 'updated-asc' | 'updated-desc'
  pagination: {
    currentPage: number
    itemsPerPage: number
  }
}
const initialState: State = {
  deckId: null, /// deckId for getting card requests
  isOpen: false, //modal window
  title: '', //input value
  orderBy: 'updated-desc',
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
  },
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
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    setOrderBy: (state, action: PayloadAction<'updated-asc' | 'updated-desc'>) => {
      state.orderBy = action.payload
    },
    getDeckIdFromCard: (state, action: PayloadAction<string>) => {
      state.deckId = action.payload
    },
    setDeckIdFromCardToNull: state => {
      //setting to null when leaving a page
      state.deckId = null
    },
    setCurrentCardsPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
  },
})

export const {
  openDialog,
  closeDialog,
  setTitle,
  setOrderBy,
  getDeckIdFromCard,
  setDeckIdFromCardToNull,
  setCurrentCardsPage,
} = cardsSlice.actions

export default cardsSlice.reducer

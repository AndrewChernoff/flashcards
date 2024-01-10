import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth/auth-slice'
import { baseApi } from './base-api'
import cardsReducer from './cards/cards-slice'
import deckReducer from './decks/deck-slice'
import paginationReducer from './pagination/pagination-slice'

export const store: any = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    deck: deckReducer,
    pagination: paginationReducer,
    card: cardsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

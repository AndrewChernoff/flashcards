import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth/auth-slice'
import { baseApi } from './base-api'
import cardReducer from './decks/cards-slice'
import paginationReducer from './pagination/pagination-slice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    deck: cardReducer,
    pagination: paginationReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

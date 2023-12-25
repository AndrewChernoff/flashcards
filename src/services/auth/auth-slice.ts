import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { User } from './types'

type State = {
  user: User | null
}

const initialState: State = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserData: (state, action: PayloadAction<User>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getUserData } = authSlice.actions

export default authSlice.reducer

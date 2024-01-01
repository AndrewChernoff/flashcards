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
    getUserData: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
  },
})

export const { getUserData } = authSlice.actions

export default authSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { UserType } from './types'

type State = {
  user: UserType | null
}

const initialState: State = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserData: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload
    },
  },
})

export const { getUserData } = authSlice.actions

export default authSlice.reducer

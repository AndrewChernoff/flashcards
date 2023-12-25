import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from './basequerywithreauth'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Me'],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})

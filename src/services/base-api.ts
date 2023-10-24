// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
/* export const baseApi = createApi({
  reducerPath: 'baseApi ',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
  }),
  endpoints: builder => ({
    getDecks: builder.query<any, string>({
      query: () => `v1/decs`,
    }),
  }),
}) */

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: () => ({}),
})

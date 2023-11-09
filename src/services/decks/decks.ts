import { baseApi } from '../base-api'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DeckResponse, DecksParams>({
        query: params => {
          return {
            url: `v1/decks`,
            method: 'GET',
            params: params || {},
          }
        },
        providesTags: ['Decks'],
      }),
      addDeck: builder.mutation<any, string>({
        query(name) {
          return {
            url: `v1/decks`,
            method: 'POST',
            body: { name },
          }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useLazyGetDecksQuery, useAddDeckMutation } = decksApi

import { baseApi } from '../base-api'

import { DeckResponse, DecksParams } from './types'

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
      addDeck: builder.mutation<any, { name: string }>({
        /* query(name) {
          return {
            url: `v1/decks`,
            method: 'POST',
            body: { name },
          }
        }, */
        query: data => ({
          url: `v1/decks`,
          method: 'POST',
          body: data,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const res = await queryFulfilled

            dispatch(
              decksApi.util.updateQueryData('getDecks', undefined, draft => {
                draft.items.push(res.data)
              })
            )
          } catch (error) {
            console.error(error)
          }
        },
        invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<any, { id: string }>({
        query: data => ({
          url: `v1/decks/${data.id}`,
          method: 'DELETE',
        }),
        async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            decksApi.util.updateQueryData('getDecks', undefined, draft => {
              /*  draft.items = */ draft.items.filter(el => el.id !== id)
            })
          )

          try {
            await queryFulfilled
          } catch (error) {
            patchResult.undo()
            console.error(error)
          }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useDeleteDeckMutation, useAddDeckMutation } = decksApi

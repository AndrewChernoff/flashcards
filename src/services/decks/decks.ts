import { omit } from 'remeda'

import { baseApi } from '../base-api'

import { Deck, DeckResponse, DecksParams } from './types'

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
      addDeck: builder.mutation<any, Deck>({
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
            decksApi.util.updateQueryData('getDecks', undefined, (draft: { items: any[] }) => {
              draft.items = draft.items.filter(el => el.id !== id)
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
      updateDeck: builder.mutation<any, { id: string; data: Deck }>({
        query(obj) {
          return {
            url: `v1/decks/${obj.id}`,
            method: 'PATCH',
            body: obj.data,
          }
        },
        async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            decksApi.util.updateQueryData('getDecks', undefined, draft => {
              Object.assign(draft, patch)
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        invalidatesTags: ['Decks'],
      }),
      getCardsDeckById: builder.query<any, { id: string; question: string }>({
        query: params => {
          return {
            url: `v1/decks/${params.id}/cards`,
            method: 'GET',
            params: omit(params, ['id']) || {},
          }
        },
        providesTags: ['Cards'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useDeleteDeckMutation,
  useAddDeckMutation,
  useUpdateDeckMutation,
  useGetCardsDeckByIdQuery,
} = decksApi

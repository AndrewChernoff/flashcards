import { omit } from 'remeda'

import { baseApi } from '../base-api'

import { CardItem, CardsResponse, Deck, DeckResponse, DecksParams } from './types'

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
                /////
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
      getCardsDeckById: builder.query<CardsResponse, { id: string; question: string }>({
        query: params => {
          return {
            url: `v1/decks/${params.id}/cards`,
            method: 'GET',
            params: omit(params, ['id']) || {},
          }
        },
        providesTags: ['Cards'],
      }),
      getCardById: builder.query<CardItem, string>({
        query: id => {
          return {
            url: `v1/decks/${id}/learn`,
            method: 'GET',
          }
        },
        providesTags: ['Cards'],
      }),
      rateCard: builder.mutation<any, { grade: string; cardId: string; deckId: string }>({
        query: params => {
          return {
            url: `v1/decks/${params.deckId}/learn`,
            method: 'POST',
            body: {
              grade: Number(params.grade),
              cardId: params.cardId,
            },
          }
        },
        invalidatesTags: ['Cards'],
      }),
      addCard: builder.mutation<any, any>({
        query: ({ id, card }) => ({
          url: `/v1/decks/${id}/cards`,
          method: 'POST',
          body: card,
        }),
        async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
          try {
            const { data: addedCard } = await queryFulfilled

            /* const patchResult = */ dispatch(
              decksApi.util.updateQueryData('getCardsDeckById', id, draft => {
                Object.assign(draft, addedCard)
              })
            )
          } catch {
            console.log('shit')
          }
        },
        invalidatesTags: ['Cards'],
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
  useLazyGetCardByIdQuery,
  useRateCardMutation,
  useAddCardMutation,
} = decksApi

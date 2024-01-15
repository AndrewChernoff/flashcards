import { omit } from 'remeda'

import { baseApi } from '../base-api'

import { CardItem, CardsResponse } from './types'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCardsDeckById: builder.query<CardsResponse, { id: string; question?: string | null }>({
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
    addCard: builder.mutation<CardsResponse, { id: string; card: CardItem }>({
      query: ({ id, card }) => ({
        url: `/v1/decks/${id}/cards`,
        method: 'POST',
        body: card,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data: addedCard } = await queryFulfilled

          dispatch(
            cardsApi.util.updateQueryData('getCardsDeckById', { id }, draft => {
              Object.assign(draft, addedCard)
            })
          )
        } catch (error) {
          console.error(error)
        }
      },
      invalidatesTags: ['Cards'],
    }),
    deleteCard: builder.mutation<CardsResponse, string>({
      query: id => ({
        url: `/v1/cards/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cardsApi.util.updateQueryData('getCardsDeckById', { id }, draft => {
            draft.items = draft.items.filter(el => el.id !== id)
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ['Cards'],
    }),

    updateCard: builder.mutation<CardItem, { id: string; card: any }>({
      query: ({ id, card }) => ({
        url: `/v1/cards/${id}`,
        method: 'PATCH',
        body: card,
      }),
      async onQueryStarted({ id, ...body }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cardsApi.util.updateQueryData('getCardsDeckById', { id }, draft => {
            draft.items = draft.items.map(el => (el.id === id ? { ...el, ...body } : el))
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ['Cards'],
    }),
  }),
})

export const {
  useGetCardsDeckByIdQuery,
  useLazyGetCardByIdQuery,
  useRateCardMutation,
  useAddCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
} = cardsApi

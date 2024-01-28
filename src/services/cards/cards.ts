import { omit } from 'remeda'

import { baseApi } from '../base-api'
import { RootState } from '../store'

import { CardItem, CardsParams, CardsResponse } from './types'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCardsDeckById: builder.query<CardsResponse, CardsParams>({
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
      /*  async onQueryStarted(__, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState

        const args: CardsParams = {
          id: state.card.deckId as string,
          question: state.card.title,
          orderBy: state.card.orderBy,
          currentPage: state.card.pagination.currentPage,
          itemsPerPage: 10,
        }

        try {
          const { data: addedCard } = await queryFulfilled

          dispatch(cardsApi.util.upsertQueryData('getCardsDeckById', args, addedCard))
        } catch (error) {
          console.error(error)
        }
      }, */
      invalidatesTags: ['Cards'],
    }),
    deleteCard: builder.mutation<void, string>({
      query: id => ({
        url: `/v1/cards/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState

        const args: CardsParams = {
          id: state.card.deckId as string,
          question: state.card.title,
          orderBy: state.card.orderBy,
          currentPage: state.card.pagination.currentPage,
          itemsPerPage: 10,
        }

        const patchResult = dispatch(
          cardsApi.util.updateQueryData('getCardsDeckById', args, draft => {
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

    updateCard: builder.mutation<CardItem, { id: string; card: CardItem }>({
      query: ({ id, card }) => ({
        url: `/v1/cards/${id}`,
        method: 'PATCH',
        body: card,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState

        const args: CardsParams = {
          id: state.card.deckId as string,
          question: state.card.title,
          orderBy: state.card.orderBy,
          currentPage: state.card.pagination.currentPage,
          itemsPerPage: 10,
        }

        try {
          const { data: updatedCard } = await queryFulfilled

          dispatch(
            cardsApi.util.updateQueryData('getCardsDeckById', args, draft => {
              draft.items = draft.items.map(el => (el.id === id ? { ...el, ...updatedCard } : el))
            })
          )
        } catch (error) {
          console.error(error)
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

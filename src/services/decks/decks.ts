import { baseApi } from '../base-api'
import { RootState } from '../store'

import { Deck, DeckDeleteResponse, DeckItemType, DeckResponse, DecksParams } from './types'

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
      getDeckById: builder.query<DeckItemType, { id: string }>({
        query: id => {
          return {
            url: `v1/decks/${id.id}`,
            method: 'GET',
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
        async onQueryStarted(__, { dispatch, queryFulfilled, getState }) {
          const state = getState() as RootState

          const args: DecksParams = {
            authorId: state.deck.tabValue === 'My decks' ? state.auth.user?.id : '',
            currentPage: state.deck.pagination.currentPage,
            name: state.deck.deckName,
            itemsPerPage: state.deck.itemsPerPage,
            minCardsCount: String(state.deck.sliderValue[0]),
            maxCardsCount: String(state.deck.sliderValue[1]),
            orderBy: state.deck.orderedBy,
          }

          try {
            const { data: createdDeck } = await queryFulfilled

            dispatch(decksApi.util.upsertQueryData('getDecks', args, createdDeck))
          } catch (error) {
            console.error(error)
          }
        },
        invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<DeckDeleteResponse, { id: string }>({
        query: data => ({
          url: `v1/decks/${data.id}`,
          method: 'DELETE',
        }),
        async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
          const state = getState() as RootState

          const args: DecksParams = {
            authorId: state.deck.tabValue === 'My decks' ? state.auth.user?.id : '',
            currentPage: state.deck.pagination.currentPage,
            name: state.deck.deckName,
            itemsPerPage: state.deck.itemsPerPage,
            minCardsCount: String(state.deck.sliderValue[0]),
            maxCardsCount: String(state.deck.sliderValue[1]),
            orderBy: state.deck.orderedBy,
          }

          const patchResult = dispatch(
            decksApi.util.updateQueryData('getDecks', args, draft => {
              draft.items = draft.items.filter(el => el.id !== id)
            })
          )

          try {
            await queryFulfilled
          } catch (error) {
            patchResult.undo()
          }
        },
        invalidatesTags: ['Decks'],
      }),
      updateDeck: builder.mutation<
        DeckResponse,
        { id: string; data: { name?: string; isPrivate?: boolean } }
      >({
        query(obj) {
          return {
            url: `v1/decks/${obj.id}`,
            method: 'PATCH',
            body: obj.data,
          }
        },
        async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
          const state = getState() as RootState

          const args: DecksParams = {
            authorId: state.deck.tabValue === 'My decks' ? state.auth.user?.id : '',
            currentPage: state.deck.pagination.currentPage,
            name: state.deck.deckName,
            itemsPerPage: state.deck.itemsPerPage,
            minCardsCount: String(state.deck.sliderValue[0]),
            maxCardsCount: String(state.deck.sliderValue[1]),
            orderBy: state.deck.orderedBy,
          }

          try {
            const { data: updatedDeck } = await queryFulfilled

            dispatch(
              decksApi.util.updateQueryData('getDecks', args, draft => {
                draft.items = draft.items.map(el => (el.id === id ? { ...el, ...updatedDeck } : el))
              })
            )
          } catch (error) {
            console.error(error)
          }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useDeleteDeckMutation,
  useAddDeckMutation,
  useUpdateDeckMutation,
  useGetDeckByIdQuery,
} = decksApi

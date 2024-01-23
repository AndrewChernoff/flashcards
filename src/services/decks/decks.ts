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
        async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
          console.log('DELETED')

          const args: DecksParams = {
            authorId: '', //6dbbc288-038d-4af2-84a6-abd97c451576
            currentPage: 1,
            name: '',
            itemsPerPage: 10,
            minCardsCount: '0',
            maxCardsCount: '50',
            orderBy: 'updated-desc',
          }

          const patchResult = dispatch(
            decksApi.util.updateQueryData('getDecks', args, draft => {
              console.log({ draft })
              draft.items = draft.items.filter(el => el.id !== id)
            })
          )

          try {
            /* const { data: deletedDeck } = */ await queryFulfilled
          } catch (error) {
            console.log({ error })
            // Отмена оптимистичного обновления в случае ошибки
            patchResult.undo()
            console.error(error)
            // decksApi.util.invalidateTags()
            //dispatch(decksApi.util.invalidateTags(['Decks']))
          }
        },
        invalidatesTags: ['Decks'],
      }),
      /* deleteDeck: builder.mutation<any, { id: string }>({
        query: data => ({
          url: `v1/decks/${data.id}`,
          method: 'DELETE',
        }),
        async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            decksApi.util.updateQueryData('getDecks', { id }, (draft: { items: any[] }) => {
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
      }), */
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
        async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            decksApi.util.updateQueryData('getDecks', undefined, draft => {
              ////?
              draft.items = draft.items.map(el => (el.id === id ? { ...el, ...data } : el))
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
    }
  },
})

export const {
  useGetDecksQuery,
  useDeleteDeckMutation,
  useAddDeckMutation,
  useUpdateDeckMutation,
} = decksApi

interface Pagination {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

interface Author {
  id: string
  name: string
}

interface Item {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string | null
  rating: number
  isDeleted: null | boolean
  isBlocked: null | boolean
  created: string
  updated: string
  cardsCount: number
  author: Author
}

interface DeckResponse {
  maxCardsCount: number
  pagination: Pagination
  items: Item[]
}

type DecksParams = {
  minCardsCount?: string
  maxCardsCount?: string
  name?: string
  authorId?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
} | void

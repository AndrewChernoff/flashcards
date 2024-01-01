interface Pagination {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

/// decks
interface Author {
  id: string
  name: string
}

export interface DeckItemType {
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

export interface DeckResponse {
  maxCardsCount: number
  pagination: Pagination
  items: DeckItemType[]
}

export type DecksParams = {
  minCardsCount?: string
  maxCardsCount?: string
  name?: string
  authorId?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
} | void

export type Deck = { name: string; cover?: File; isPrivate?: boolean }

///cards from deck
export interface CardItem {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  created: string
  updated: string
}

export interface CardsResponse {
  items: CardItem[]
  pagination: Pagination
}

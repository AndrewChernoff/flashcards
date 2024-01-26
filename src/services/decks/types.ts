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
  orderBy?: 'updated-asc' | 'updated-desc'
  currentPage?: number
  itemsPerPage?: number
} | void

export type DeckDeleteResponse = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  cover: string | null
  created: string
  updated: string
  cardsCount: number
}

export type DeckUpdateResponse = {
  author: Author
  id: string
  userId: string
  name: string
  isPrivate: boolean
  cover: string
  created: string
  updated: string
  cardsCount: number
}

export type Deck = { name: string; cover?: File; isPrivate?: boolean } ///for uploading and updating deck

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
  grade: number
}

export interface CardsResponse {
  items: CardItem[]
  pagination: Pagination
}

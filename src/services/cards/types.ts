interface Pagination {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

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

export type CardsParams = {
  id: string
  question?: string
  answer?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

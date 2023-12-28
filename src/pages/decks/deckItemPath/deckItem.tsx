import { useParams } from 'react-router-dom'

import { useGetDeckByIdQuery } from '../../../services/decks/decks'

const DeckItem = () => {
  const { id: deckId, isLoading } = useParams()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!deckId) {
    return <div>Invalid deck ID</div> // or handle the error case in any appropriate way
  }

  const { data: deck } = useGetDeckByIdQuery(deckId)

  console.log(deck)

  return <div></div>
}

export default DeckItem

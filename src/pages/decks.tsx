import { Link } from 'react-router-dom'

import { useAddDeckMutation, useGetDecksQuery } from '../services/decks/decks'

const Decks = () => {
  const decks = useGetDecksQuery({ itemsPerPage: 25 })
  const [addDeck] = useAddDeckMutation()

  console.log(decks)

  return (
    <div>
      <Link to="/2">Go</Link>

      <button onClick={() => addDeck('yoooo')}>add</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cards</th>
            <th>Updated</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {decks.data?.items.map((deck: any) => {
            return (
              <tr key={deck.id}>
                <td>{deck.name}</td>
                <td>{deck.cardsCount}</td>
                <td>{deck.updated}</td>
                <td>{deck.author.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Decks

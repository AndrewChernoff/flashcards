import { Link } from 'react-router-dom'

import { Arrow } from '../../common/svg/sorting-arrow'
import { formatDate } from '../../common/utils/time-transfering'
import { Table } from '../../components/ui/table/table'
import {
  useAddDeckMutation,
  useGetDecksQuery,
  useLazyGetDecksQuery,
} from '../../services/decks/decks'

import s from './decks.module.scss'

const Decks = () => {
  //const [filter, setFilter] = useState<'name-desc' | 'name-asc'>('name-asc')

  const decks = useGetDecksQuery({ itemsPerPage: 25 /* , orderBy: filter */ })
  const [addDeck] = useAddDeckMutation()
  const [getDecks2, decks2] = useLazyGetDecksQuery()

  /*  const filterDirection = () =>
    filter === 'name-asc' ? setFilter('name-desc') : setFilter('name-asc')*/

  console.log(decks2)

  return (
    <div className={s.decks}>
      <Link to="/2">Go</Link>

      <button onClick={() => addDeck('слегка выгорел)')}>add</button>
      <button onClick={() => getDecks2()}>DECKS2</button>

      <Table.Root className={s.table}>
        <Table.Head>
          <Table.Row className={s.row}>
            <Table.HeadCell className={s.headCell}>Name</Table.HeadCell>
            <Table.HeadCell className={s.headCell}>Cards</Table.HeadCell>
            <Table.HeadCell className={s.headCell}>
              Updated
              {/* <button onClick={filterDirection}>
                <Arrow />
              </button> */}
            </Table.HeadCell>
            <Table.HeadCell className={s.headCell}>Created By</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {decks.data?.items.map((deck: any) => {
            return (
              <Table.Row className={s.dataRow} key={deck.id}>
                <Table.DataCell className={s.dataCell}>{deck.name}</Table.DataCell>
                <Table.DataCell className={s.dataCell}>{deck.cardsCount}</Table.DataCell>
                <Table.DataCell className={s.dataCell}>{formatDate(deck.updated)}</Table.DataCell>
                <Table.DataCell className={s.dataCell}>{deck.author.name}</Table.DataCell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default Decks

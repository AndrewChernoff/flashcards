import { useState } from 'react'

import { Link } from 'react-router-dom'

import { formatDate } from '../../common/utils/time-transfering'
import { Button } from '../../components/ui/button'
import Switcher from '../../components/ui/switcher/switcher'
import { Table } from '../../components/ui/table/table'
import { useGetMeQuery } from '../../services/auth/auth'
import {
  useAddDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
} from '../../services/decks/decks'

import s from './decks.module.scss'

export type TabValue = 'All cards' | 'My cards'

const Decks = () => {
  const [tabValue, setTabValue] = useState<TabValue>('All cards')

  const { data: me } = useGetMeQuery()

  const { data: decks } = useGetDecksQuery({
    itemsPerPage: 25,
    authorId:
      tabValue === 'My cards' && me.id ? me.id : '' /*'6dbbc288-038d-4af2-84a6-abd97c451576' */,
  })
  const [addDeck] = useAddDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const onDeleteDeck = (id: string) => {
    deleteDeck({ id })
  }

  const onTabValueChange = (value: TabValue) => setTabValue(value)

  return (
    <div className={s.decks}>
      <Link to="/2">Go</Link>

      <button onClick={() => addDeck({ name: '55556' })}>add</button>

      <Switcher tabValue={tabValue} onTabValueChange={onTabValueChange} />
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
          {decks?.items.map((deck: any) => {
            return (
              <Table.Row className={s.dataRow} key={deck.id}>
                <Table.DataCell className={s.dataCell}>{deck.name}</Table.DataCell>
                <Table.DataCell className={s.dataCell}>{deck.cardsCount}</Table.DataCell>
                <Table.DataCell className={s.dataCell}>{formatDate(deck.updated)}</Table.DataCell>
                <Table.DataCell className={s.dataCell}>
                  {deck.author.name}
                  <Button variant="purple" callBack={() => onDeleteDeck(deck.id)}>
                    Delete
                  </Button>
                </Table.DataCell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default Decks

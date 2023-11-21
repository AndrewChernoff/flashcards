import { ChangeEvent, memo, useCallback, useMemo, useState } from 'react'

import { Link } from 'react-router-dom'

import { formatDate } from '../../common/utils/time-transfering'
import { Button } from '../../components/ui/button'
import Input from '../../components/ui/input/input'
import EditableSlider from '../../components/ui/slider/slider'
import { Table } from '../../components/ui/table/table'
import Tabs from '../../components/ui/tabs/tabs'
import { useGetMeQuery } from '../../services/auth/auth'
import {
  useAddDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
} from '../../services/decks/decks'

import s from './decks.module.scss'

export type TabValue = 'All cards' | 'My cards'

const Decks = () => {
  const [sliderValue, setSliderValue] = useState<number[]>([0, 50])
  const [tabValue, setTabValue] = useState<TabValue>('All cards')
  const [deckNameValue, setDeckNameValue] = useState<string>('')

  const { data: me } = useGetMeQuery()

  const { data: decks } = useGetDecksQuery({
    itemsPerPage: 25,
    authorId: tabValue === 'My cards' && me.id ? me.id : '',
    minCardsCount: String(sliderValue[0]),
    maxCardsCount: String(sliderValue[1]),
    name: deckNameValue,
  })
  const [addDeck] = useAddDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const onDeleteDeck = (id: string) => {
    deleteDeck({ id })
  }

  const onTabValueChange = (value: TabValue) => setTabValue(value)

  const changeSliderValue = (value: number[]) => setSliderValue(value)

  const onInputValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setDeckNameValue(e.currentTarget.value),
    []
  )

  return (
    <div className={s.decks}>
      <Link to="/2">Go</Link>

      <button onClick={() => addDeck({ name: '55556' })}>add</button>

      <div className={s.filters}>
        <Input
          isSearch={true}
          placeholder="Search"
          type="text"
          value={deckNameValue}
          onValueChange={onInputValueChange}
        />
        <Tabs
          tabValue={tabValue}
          onTabValueChange={onTabValueChange}
          //className={s.filters__tabs}
        />

        <EditableSlider
          value={sliderValue}
          callback={changeSliderValue} /* className={s.filters__slider} */
        />
      </div>
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

export default memo(Decks)

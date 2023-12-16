import { ChangeEvent, memo, useCallback, useState } from 'react'

import defaultCover from '../../common/imgs/default-cover.png'
import Delete from '../../common/svg/delete'
import Edit from '../../common/svg/edit'
import PlayCircle from '../../common/svg/play-circle'
import { formatDate } from '../../common/utils/time-transfering'
import { Button } from '../../components/ui/button'
import Input from '../../components/ui/input/input'
import AddDeckDialog from '../../components/ui/modal/addDeckDialog/addDeckDialog'
import Pagination from '../../components/ui/pagination/pagination'
import EditableSlider from '../../components/ui/slider/slider'
import { Table } from '../../components/ui/table/table'
import Tabs from '../../components/ui/tabs/tabs'
import { useGetMeQuery } from '../../services/auth/auth'
import { useDeleteDeckMutation, useGetDecksQuery } from '../../services/decks/decks'

import s from './decks.module.scss'

export type TabValue = 'All cards' | 'My cards'

const Decks = () => {
  const [sliderValue, setSliderValue] = useState<number[]>([0, 50]) ////slider range
  const [tabValue, setTabValue] = useState<TabValue>('All cards') ////tabs for decks
  const [deckNameValue, setDeckNameValue] = useState<string>('') ///input for searching deck by name
  const [currentPage, setCurrentPage] = useState<number>(1) /// for pagination
  const [activeIndex, setActiveIndex] = useState<string[]>([]) /// flag for disabling button on delete request
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { data: me } = useGetMeQuery()

  const { data: decks } = useGetDecksQuery({
    itemsPerPage: 10,
    authorId: tabValue === 'My cards' && me.id ? me.id : '',
    minCardsCount: String(sliderValue[0]),
    maxCardsCount: String(sliderValue[1]),
    name: deckNameValue,
    currentPage: currentPage,
  })

  const [deleteDeck] = useDeleteDeckMutation()

  const onTabValueChange = (value: TabValue) => setTabValue(value)

  const changeSliderValue = (value: number[]) => setSliderValue(value)

  const onInputValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setDeckNameValue(e.currentTarget.value),
    []
  )

  const onDeleteDeckHandler = (id: string) => {
    setActiveIndex(oldArray => [...oldArray, id])
    deleteDeck({ id })
  }

  const handleDialogWindow = () => setIsOpen(!isOpen)

  return (
    <div className={s.decks}>
      <header>
        <h1>Packs list</h1>
        <Button variant="purple" callBack={handleDialogWindow}>
          Add New Pack
        </Button>
      </header>

      <div className={s.filters}>
        <Input
          isSearch={true}
          placeholder="Search"
          type="text"
          value={deckNameValue}
          onValueChange={onInputValueChange}
        />
        <Tabs tabValue={tabValue} onTabValueChange={onTabValueChange} />

        <EditableSlider value={sliderValue} callback={changeSliderValue} />

        <Button className={s.clear}>Clear Filter</Button>
      </div>
      <Table.Root className={s.table}>
        <Table.Head>
          <Table.Row className={s.row}>
            <Table.HeadCell className={s.headCell}>Cover</Table.HeadCell>
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
                <Table.DataCell className={s.dataCell}>
                  <img className={s.dataCell__img} src={deck.cover || defaultCover} />
                </Table.DataCell>
                <Table.DataCell className={s.dataCell}>{deck.name}</Table.DataCell>
                <Table.DataCell className={s.dataCell}>{deck.cardsCount}</Table.DataCell>
                <Table.DataCell className={s.dataCell}>{formatDate(deck.updated)}</Table.DataCell>
                <Table.DataCell className={`${s.dataCell} ${s.decks__createdBy}`}>
                  {deck.author.name}

                  <div className={s.decks__createdBy_buttons}>
                    <PlayCircle />
                    <Edit />
                    {deck.author.id === me.id && (
                      <button
                        disabled={activeIndex.some(el => el === deck.id)}
                        onClick={() => onDeleteDeckHandler(deck.id)}
                      >
                        <Delete />
                      </button>
                    )}
                  </div>
                </Table.DataCell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
      {decks && (
        <Pagination
          totalCount={decks.pagination.totalItems}
          pageSize={10}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          className={s.decks__pagination} /////////////!!!!!!!!!
        />
      )}
      <AddDeckDialog isOpen={isOpen} closeDialog={(value: boolean) => setIsOpen(value)} />
    </div>
  )
}

export default memo(Decks)

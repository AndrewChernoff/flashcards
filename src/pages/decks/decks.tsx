import { ChangeEvent, memo, useCallback, useState } from 'react'

import WrapperHeader from '../../common/component/wrapper-header'
import { useAppSelector } from '../../common/hooks/redux-hooks'
import { Button } from '../../components/ui/button'
import DeckItem from '../../components/ui/deckItem/deckItem'
import Input from '../../components/ui/input/input'
import AddDeckDialog from '../../components/ui/modal/addDeckDialog/addDeckDialog'
import Pagination from '../../components/ui/pagination/pagination'
import EditableSlider from '../../components/ui/slider/slider'
import { Table } from '../../components/ui/table/table'
import Tabs from '../../components/ui/tabs/tabs'
import { H2 } from '../../components/ui/typography/typography'
import { useAddDeckMutation, useGetDecksQuery } from '../../services/decks/decks'
import { DeckItemType } from '../../services/decks/types'

import s from './decks.module.scss'

export type TabValue = 'All cards' | 'My cards'

const Decks = () => {
  const [sliderValue, setSliderValue] = useState<number[]>([0, 50]) ////slider range
  const [tabValue, setTabValue] = useState<TabValue>('All cards') ////tabs for decks
  const [deckNameValue, setDeckNameValue] = useState<string>('') ///input for searching deck by name
  const [currentPage, setCurrentPage] = useState<number>(1) /// for pagination
  const [isNewPackDialodOpen, setIsNewPackDialogOpen] = useState<boolean>(false)

  const me = useAppSelector(state => state.auth?.user)

  const { data: decks } = useGetDecksQuery({
    itemsPerPage: 10,
    authorId: tabValue === 'My cards' && me?.id ? me.id : '',
    minCardsCount: String(sliderValue[0]),
    maxCardsCount: String(sliderValue[1]),
    name: deckNameValue,
    currentPage: currentPage,
  })

  /* deck manipulations */
  const [addDeck] = useAddDeckMutation()

  /*  const [deleteDeck] = useDeleteDeckMutation()

  const [updateDeck] = useUpdateDeckMutation() */

  const onTabValueChange = (value: TabValue) => setTabValue(value)

  const changeSliderValue = (value: number[]) => setSliderValue(value)

  const onInputValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setDeckNameValue(e.currentTarget.value), ////searching input
    []
  )
  /*Add deck dialog functionality */
  const handleAddDeckDialog = () => setIsNewPackDialogOpen(!isNewPackDialodOpen)

  return (
    <WrapperHeader>
      <div className={s.decks}>
        <header>
          <h1>Packs list</h1>
          <Button variant="purple" callBack={handleAddDeckDialog}>
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
        {decks && decks?.items.length > 0 ? (
          <>
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
                {decks?.items.map((deck: DeckItemType) => {
                  return <DeckItem myId={me?.id} deck={deck} key={deck.id} />
                })}
              </Table.Body>
            </Table.Root>
            <Pagination
              totalCount={decks.pagination.totalItems}
              pageSize={10}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              className={s.decks__pagination}
            />
          </>
        ) : (
          <H2>No Decks Here</H2>
        )}

        <AddDeckDialog
          isOpen={isNewPackDialodOpen}
          closeDialog={(value: boolean) => setIsNewPackDialogOpen(value)}
          callback={addDeck}
          btnDescription={'Add New Pack'}
        />
      </div>
    </WrapperHeader>
  )
}

export default memo(Decks)

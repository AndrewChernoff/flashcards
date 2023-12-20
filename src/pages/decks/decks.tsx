import { ChangeEvent, memo, useCallback, useState } from 'react'

import { Button } from '../../components/ui/button'
import Input from '../../components/ui/input/input'
import AddDeckDialog from '../../components/ui/modal/addDeckDialog/addDeckDialog'
import DeleteDeckDialog from '../../components/ui/modal/deleteDeckDialog/deleteDeckDialog'
import Pagination from '../../components/ui/pagination/pagination'
import EditableSlider from '../../components/ui/slider/slider'
import { Table } from '../../components/ui/table/table'
import Tabs from '../../components/ui/tabs/tabs'
import { useGetMeQuery } from '../../services/auth/auth'
import { useDeleteDeckMutation, useGetDecksQuery } from '../../services/decks/decks'

import DeckItem from './deckItem/deckItem'
import s from './decks.module.scss'

export type TabValue = 'All cards' | 'My cards'

const Decks = () => {
  const [sliderValue, setSliderValue] = useState<number[]>([0, 50]) ////slider range
  const [tabValue, setTabValue] = useState<TabValue>('All cards') ////tabs for decks
  const [deckNameValue, setDeckNameValue] = useState<string>('') ///input for searching deck by name
  const [currentPage, setCurrentPage] = useState<number>(1) /// for pagination
  const [isNewPackDialodOpen, setIsNewPackDialogOpen] = useState<boolean>(false)
  const [isDeletePackDialodOpen, setIsDeletePackDialogOpen] = useState<boolean>(false)
  const [deleteDeckId, setDeleteDeckId] = useState<string | null>(null)

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
    (e: ChangeEvent<HTMLInputElement>) => setDeckNameValue(e.currentTarget.value), ////searching input
    []
  )

  const handleAddDeckDialog = () => setIsNewPackDialogOpen(!isNewPackDialodOpen)
  const handleDeleteDeckDialog = (id: string) => {
    /*when open dialog we get id from there for deleting deck from dialog window */
    setIsDeletePackDialogOpen(!isDeletePackDialodOpen)
    setDeleteDeckId(id)
  }

  const handleDeleteDeck = () => {
    if (deleteDeckId) {
      deleteDeck({ id: deleteDeckId })
      setDeleteDeckId(null)
      setIsDeletePackDialogOpen(!isDeletePackDialodOpen)
    }
  }

  return (
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
              <DeckItem
                myId={me.id}
                deck={deck}
                key={deck.id}
                openDialog={handleDeleteDeckDialog}
              />
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
      <AddDeckDialog
        isOpen={isNewPackDialodOpen}
        closeDialog={(value: boolean) => setIsNewPackDialogOpen(value)}
      />
      <DeleteDeckDialog
        isOpen={isDeletePackDialodOpen}
        closeDialog={() => setIsDeletePackDialogOpen(false)}
        deleteDeck={handleDeleteDeck}
      />
    </div>
  )
}

export default memo(Decks)

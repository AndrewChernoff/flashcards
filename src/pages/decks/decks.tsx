import { ChangeEvent, memo, useCallback, useState } from 'react'

import WrapperHeader from '../../common/component/wrapper-header'
import { useAppSelector } from '../../common/hooks/redux-hooks'
import { Button } from '../../components/ui/button'
import DeckItem from '../../components/ui/deckItem/deckItem'
import Input from '../../components/ui/input/input'
import AddDeckDialog from '../../components/ui/modal/addDeckDialog/addDeckDialog'
import CardDialog from '../../components/ui/modal/cardDialog/cardDialog'
import DeleteDeckDialog from '../../components/ui/modal/deleteDeckDialog/deleteDeckDialog'
import Pagination from '../../components/ui/pagination/pagination'
import EditableSlider from '../../components/ui/slider/slider'
import { Table } from '../../components/ui/table/table'
import Tabs from '../../components/ui/tabs/tabs'
import {
  useAddDeckMutation,
  useDeleteDeckMutation,
  useLazyGetCardByIdQuery,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '../../services/decks/decks'

import s from './decks.module.scss'

export type TabValue = 'All cards' | 'My cards'

const Decks = () => {
  const [sliderValue, setSliderValue] = useState<number[]>([0, 50]) ////slider range
  const [tabValue, setTabValue] = useState<TabValue>('All cards') ////tabs for decks
  const [deckNameValue, setDeckNameValue] = useState<string>('') ///input for searching deck by name
  const [currentPage, setCurrentPage] = useState<number>(1) /// for pagination
  const [isNewPackDialodOpen, setIsNewPackDialogOpen] = useState<boolean>(false)

  /*delete deck functionality */
  const [isDeletePackDialodOpen, setIsDeletePackDialogOpen] = useState<boolean>(false)
  const [deleteDeckId, setDeleteDeckId] = useState<string | null>(null)
  /*update deck functionality */
  const [isUpdatePackDialodOpen, setIsUpdatePackDialodOpen] = useState<boolean>(false)
  const [updateDeckId, setUpdateDeckId] = useState<string | null>(null)
  /*open card dialog functionality */
  const [isCardDialogOpen, setIsCardDialogOpen] = useState<boolean>(false)

  const me = useAppSelector(state => state.auth.user)

  const { data: decks } = useGetDecksQuery({
    itemsPerPage: 10,
    authorId: tabValue === 'My cards' && me?.id ? me.id : '',
    minCardsCount: String(sliderValue[0]),
    maxCardsCount: String(sliderValue[1]),
    name: deckNameValue,
    currentPage: currentPage,
  })

  /* calling dialog for learning cards  */
  /// const deckId = useAppSelector(state => state.deck.deck?.id) remove

  const [trigger, { data: card }] = useLazyGetCardByIdQuery() /// get card on request

  const openCardDialog = () => setIsCardDialogOpen(!isCardDialogOpen)

  /* deck manipulations */
  const [addDeck] = useAddDeckMutation()

  const [deleteDeck] = useDeleteDeckMutation()

  const [updateDeck] = useUpdateDeckMutation()

  const onTabValueChange = (value: TabValue) => setTabValue(value)

  const changeSliderValue = (value: number[]) => setSliderValue(value)

  const onInputValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setDeckNameValue(e.currentTarget.value), ////searching input
    []
  )
  /*Add deck dialog functionality */
  const handleAddDeckDialog = () => setIsNewPackDialogOpen(!isNewPackDialodOpen)

  /*Delete deck dialog functions */
  const handleDeleteDeckDialog = (id: string) => {
    ///when open dialog we get id from there for deleting deck from dialog window
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

  /*Update deck dialog functions */
  const handleUpdateDeckDialog = (id: string) => {
    setIsUpdatePackDialodOpen(!isUpdatePackDialodOpen)
    setUpdateDeckId(id)
  }

  const handleUpdateDeck = (obj: any) => {
    if (updateDeckId) {
      updateDeck({ id: updateDeckId, data: obj })
      setUpdateDeckId(null)
      setIsUpdatePackDialodOpen(!isUpdatePackDialodOpen)
    }
  }

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
                  requestForCards={trigger}
                  openCardDialog={openCardDialog}
                  myId={me?.id}
                  deck={deck}
                  key={deck.id}
                  openDeleteDialog={handleDeleteDeckDialog}
                  openEditDialog={handleUpdateDeckDialog}
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
            className={s.decks__pagination}
          />
        )}
        <AddDeckDialog
          title={'Add New Pack'}
          isOpen={isNewPackDialodOpen}
          closeDialog={(value: boolean) => setIsNewPackDialogOpen(value)}
          callback={addDeck}
          btnDescription={'Add New Pack'}
        />
        <AddDeckDialog //update
          title={'Edit New Pack'}
          isOpen={isUpdatePackDialodOpen}
          closeDialog={(value: boolean) => setIsUpdatePackDialodOpen(value)}
          callback={handleUpdateDeck}
          btnDescription={'Edit pack'}
        />
        <DeleteDeckDialog
          isOpen={isDeletePackDialodOpen}
          closeDialog={() => setIsDeletePackDialogOpen(false)}
          deleteDeck={handleDeleteDeck}
        />

        <CardDialog
          isOpen={isCardDialogOpen}
          card={card}
          closeDialog={() => setIsCardDialogOpen(false)}
        />
      </div>
    </WrapperHeader>
  )
}

export default memo(Decks)

import { ChangeEvent, memo, useCallback, useState } from 'react'

import { toast } from 'react-toastify'

import s from './decks.module.scss'

import WrapperHeader from '@/common/component/wrapper-header'
import { useAppDispatch, useAppSelector } from '@/common/hooks/redux-hooks'
import FilterArrow from '@/common/svg/filterArrow'
import { Button } from '@/components/ui/button'
import DeckItem from '@/components/ui/deckItem/deckItem'
import Input from '@/components/ui/input/input'
import AddDeckDialog from '@/components/ui/modal/add-deck-dialog/add-deck-dialog'
import Pagination from '@/components/ui/pagination/pagination'
import EditableSlider from '@/components/ui/slider/slider'
import { Table } from '@/components/ui/table/table'
import Tabs from '@/components/ui/tabs/tabs'
import { H2 } from '@/components/ui/typography/typography'
import {
  setDeckNameValue,
  setOrderedBy,
  setSliderValue,
  setTabValue,
} from '@/services/decks/deck-slice'
import { useAddDeckMutation, useGetDecksQuery } from '@/services/decks/decks'
import { DeckItemType } from '@/services/decks/types'

export type TabValue = 'All cards' | 'My cards'

const Decks = () => {
  const dispatch = useAppDispatch()
  const sliderValue = useAppSelector(state => state.deck.sliderValue) ////slider range value
  const tabValue = useAppSelector(state => state.deck.tabValue) ////tabs for decks
  const deckNameValue = useAppSelector(state => state.deck.deckName) ///input value for searching deck by name
  const orderedBy = useAppSelector(state => state.deck.orderedBy) ///decks order

  const currentPage = useAppSelector(state => state.pagination.currentPage) // for pagination

  const [isNewPackDialodOpen, setIsNewPackDialogOpen] = useState<boolean>(false)

  const me = useAppSelector(state => state.auth?.user)

  const { currentData: decks, isError } = useGetDecksQuery({
    itemsPerPage: 10,
    authorId: tabValue === 'My cards' && me?.id ? me.id : '',
    minCardsCount: String(sliderValue[0]),
    maxCardsCount: String(sliderValue[1]),
    name: deckNameValue.trim(),
    currentPage: currentPage,
    orderBy: orderedBy,
  })

  /* deck manipulations */
  const [addDeck] = useAddDeckMutation()

  const onTabValueChange = (value: TabValue) => dispatch(setTabValue(value))

  const changeSliderValue = (value: number[]) => dispatch(setSliderValue(value))

  const onInputValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => dispatch(setDeckNameValue(e.currentTarget.value)), ////searching input
    []
  )
  /*Add deck dialog functionality */
  const handleAddDeckDialog = () => setIsNewPackDialogOpen(!isNewPackDialodOpen)

  /* filteration */
  const filterOrder = (order: 'updated-asc' | 'updated-desc') =>
    order === 'updated-asc'
      ? dispatch(setOrderedBy('updated-desc'))
      : dispatch(setOrderedBy('updated-asc'))

  const clearFilters = () => {
    dispatch(setOrderedBy('updated-desc'))
    setDeckNameValue('')
    dispatch(setSliderValue([0, 50]))
    setTabValue('All cards')
  }

  if (isError) {
    toast.error('Something went wrong. Try to refresh the page or come here later', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }

  return (
    <WrapperHeader>
      <div className={s.decks}>
        <div className={s.header}>
          <h1>Packs list</h1>
          <Button variant="purple" callBack={handleAddDeckDialog}>
            Add New Pack
          </Button>
        </div>

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

          <Button className={s.clear} callBack={clearFilters}>
            Clear Filter
          </Button>
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
                    Updated{' '}
                    <button style={{ cursor: 'pointer' }} onClick={() => filterOrder(orderedBy)}>
                      <FilterArrow direction={orderedBy} />
                    </button>
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
              className={s.decks__pagination}
            />
          </>
        ) : (
          <div>
            <H2>No decks with this name</H2>
          </div>
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

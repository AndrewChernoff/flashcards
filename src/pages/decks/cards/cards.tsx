import { ChangeEvent, useEffect, useState } from 'react'

import { useLocation, useParams, Link } from 'react-router-dom'

import Card from './cardItem/cardItem'
import s from './cards.module.scss'

import WrapperHeader from '@/common/component/wrapper-header'
import { useAppDispatch, useAppSelector } from '@/common/hooks/redux-hooks'
import FilterArrow from '@/common/svg/filterArrow'
import LeftArrow from '@/common/svg/left-arrow'
import { Button } from '@/components/ui/button'
import EmptyDeck from '@/components/ui/empty-deck/empty-deck'
import Input from '@/components/ui/input/input'
import { Loader } from '@/components/ui/loader/loader'
import AddCardDialog from '@/components/ui/modal/add-card-dialog/add-card-dialog'
import CardDialog from '@/components/ui/modal/card-dialog/card-dialog'
import Pagination from '@/components/ui/pagination/pagination'
import { Table } from '@/components/ui/table/table'
import { H1 } from '@/components/ui/typography/typography'
import { useGetCardsDeckByIdQuery, useLazyGetCardByIdQuery } from '@/services/cards/cards'
import {
  closeDialog,
  getDeckIdFromCard,
  openDialog,
  setCurrentCardsPage,
  setDeckIdFromCardToNull,
  setOrderBy,
  setTitle,
} from '@/services/cards/cards-slice'
import { CardItem } from '@/services/decks/types'

const Cards = () => {
  const [isCardDialogOpen, setIsCardDialogOpen] = useState<boolean>(false) ///card dialog

  const dispatch = useAppDispatch()

  const { id: deckId } = useParams()
  const deckProps = useLocation()
  const title = useAppSelector(state => state.card.title) /// input value
  const ordredBy = useAppSelector(state => state.card.orderBy) ///orderedBy
  const currentPage = useAppSelector(state => state.card.pagination.currentPage)
  const me = useAppSelector(state => state.auth.user)

  const isModalOpen = useAppSelector(state => state.card.isOpen)

  const closeDialogHandler = () => dispatch(closeDialog({}))
  const openDialogHandler = () => dispatch(openDialog({}))

  if (!deckId) {
    return <div>Invalid deck ID</div>
  }

  useEffect(() => {
    dispatch(getDeckIdFromCard(deckId))

    return () => {
      dispatch(setDeckIdFromCardToNull({}))
    }
  }, [])

  const { currentData: cards, isLoading } = useGetCardsDeckByIdQuery({
    id: deckId,
    question: title.trim(),
    orderBy: ordredBy,
    currentPage: currentPage,
    itemsPerPage: 10,
  })

  const [trigger, { data: card }] = useLazyGetCardByIdQuery() /// get card on request

  if (isLoading) {
    return <Loader />
  }
  const onInputTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setTitle(e.currentTarget.value.trim()))

  const filterOrder = (order: 'updated-asc' | 'updated-desc') =>
    order === 'updated-asc'
      ? dispatch(setOrderBy('updated-desc'))
      : dispatch(setOrderBy('updated-asc'))

  const deckName = deckProps.state.deckName
  const deckUserId = deckProps.state.userId

  /*for pagination */
  const onNextPage = () => {
    dispatch(setCurrentCardsPage(currentPage + 1))
  }

  const onPreviousPage = () => {
    dispatch(setCurrentCardsPage(currentPage - 1))
  }

  const setCurrentCardsPageFunc = (value: string) => dispatch(setCurrentCardsPage(Number(value))) /// for select in pagination component

  return (
    <WrapperHeader>
      <div className={s.cards}>
        <div className={s.cards__header}>
          <div className={s.cards__header_title}>
            <Link to="/decks" className={s.link}>
              <LeftArrow />
              <p> Back to Packs List</p>
            </Link>
            <H1>{deckName}</H1>
          </div>

          {deckUserId === me?.id && cards && cards?.items.length > 0 && (
            <Button variant="purple" callBack={openDialogHandler}>
              Add New Card
            </Button>
          )}
          {deckUserId !== me?.id && cards && cards?.items.length > 0 && (
            <Button
              variant="purple"
              callBack={() => {
                trigger(deckId)
                setIsCardDialogOpen(true)
              }}
            >
              Learn to Deck
            </Button>
          )}
        </div>

        {cards && cards?.items && cards.items.length === 0 && title.trim().length === 0 && (
          <EmptyDeck myId={me?.id} deckUserId={deckUserId} deckId={deckId} />
        )}

        {cards && cards?.items && cards.items.length > 0 && (
          <>
            <div className={s.filters}>
              <Input
                isSearch={true}
                placeholder="Search"
                type="text"
                value={title}
                onValueChange={onInputTitleChange}
              />
            </div>
            <Table.Root className={s.table}>
              <Table.Head>
                <Table.Row className={s.row}>
                  <Table.HeadCell className={s.headCell}>Question</Table.HeadCell>
                  <Table.HeadCell className={s.headCell}>Answer</Table.HeadCell>
                  <Table.HeadCell className={s.headCell}>
                    Updated{' '}
                    <button style={{ cursor: 'pointer' }} onClick={() => filterOrder(ordredBy)}>
                      <FilterArrow direction={ordredBy} />
                    </button>
                  </Table.HeadCell>
                  <Table.HeadCell className={s.headCell}>Grade</Table.HeadCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {cards?.items.map((card: CardItem) => {
                  return <Card card={card} myId={me?.id} key={card.id} />
                })}
              </Table.Body>
            </Table.Root>
            <Pagination
              totalCount={cards.pagination.totalItems}
              pageSize={cards.pagination.itemsPerPage}
              onNextPage={onNextPage}
              onPreviousPage={onPreviousPage}
              currentPage={currentPage}
              setCurrentPageFunc={setCurrentCardsPageFunc}
              className={s.cards__pagination}
              totalPages={cards.pagination.totalPages}
            />
          </>
        )}
      </div>
      <CardDialog
        isOpen={isCardDialogOpen}
        card={card}
        closeDialog={() => setIsCardDialogOpen(false)}
        requestCard={trigger}
        deckId={deckId}
      />
      <AddCardDialog isOpen={isModalOpen} deckId={deckId} closeDialog={closeDialogHandler} />
    </WrapperHeader>
  )
}

export default Cards

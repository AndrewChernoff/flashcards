import { ChangeEvent, useEffect } from 'react'

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
import { Table } from '@/components/ui/table/table'
import { H1 } from '@/components/ui/typography/typography'
import { useGetCardsDeckByIdQuery } from '@/services/cards/cards'
import {
  closeDialog,
  getDeckIdFromCard,
  openDialog,
  setDeckIdFromCardToNull,
  setOrderBy,
  setTitle,
} from '@/services/cards/cards-slice'
import { CardItem } from '@/services/decks/types'

const Cards = () => {
  const dispatch = useAppDispatch()

  const { id: deckId } = useParams()
  const deckProps = useLocation()
  //const [title, setTitle] = useState<string>('') /// input value
  const title = useAppSelector(state => state.card.title) /// input value
  const ordredBy = useAppSelector(state => state.card.orderBy) ///orderedBy
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

  const { data: cards, isLoading } = useGetCardsDeckByIdQuery({
    id: deckId,
    question: title.trim(),
    orderBy: ordredBy,
    currentPage: 1,
    itemsPerPage: 10,
  })

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
            <Button variant="purple">Learn to Pack</Button>
          )}
        </div>

        {cards?.items && cards.items.length === 0 && title.trim().length === 0 ? (
          <EmptyDeck myId={me?.id} deckUserId={deckUserId} deckId={deckId} />
        ) : (
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
          </>
        )}
        {/* <Pagination
              totalCount={decks.pagination.totalItems}
              pageSize={10}
              className={s.decks__pagination}
            /> */}
      </div>
      <AddCardDialog isOpen={isModalOpen} deckId={deckId} closeDialog={closeDialogHandler} />
    </WrapperHeader>
  )
}

export default Cards

import { ChangeEvent, useState } from 'react'

import { useLocation, useParams, Link } from 'react-router-dom'

import WrapperHeader from '../../../common/component/wrapper-header'
import { useAppSelector } from '../../../common/hooks/redux-hooks'
import Delete from '../../../common/svg/delete'
import Edit from '../../../common/svg/edit'
import LeftArrow from '../../../common/svg/left-arrow'
import { formatDate } from '../../../common/utils/time-transfering'
import { Button } from '../../../components/ui/button'
import EmptyDeck from '../../../components/ui/empty-deck/empty-deck'
import Input from '../../../components/ui/input/input'
import StarRating from '../../../components/ui/star-rating/star-rating'
import { Table } from '../../../components/ui/table/table'
import { H1 } from '../../../components/ui/typography/typography'
import { useGetCardsDeckByIdQuery } from '../../../services/decks/decks'
import { CardItem } from '../../../services/decks/types'

import s from './cards.module.scss'

const Cards = () => {
  const { id: deckId } = useParams()
  const deckProps = useLocation()

  const [title, setTitle] = useState<string>('')
  const me = useAppSelector(state => state.auth.user)

  if (!deckId) {
    return <div>Invalid deck ID</div>
  }

  const { data: cards, isLoading } = useGetCardsDeckByIdQuery({
    id: deckId,
    question: title,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }
  const onInputTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

  const deckName = deckProps.state.deckName
  const deckUserId = deckProps.state.userId

  return (
    <WrapperHeader>
      <div className={s.cards}>
        <header className={s.cards__header}>
          <div className={s.cards__header_title}>
            <Link to="/decks" className={s.link}>
              <LeftArrow />
              <p> Back to Packs List</p>
            </Link>
            <H1>{deckName}</H1>
          </div>

          <Button variant="purple">Learn to Pack</Button>
        </header>

        {cards?.items.length === 0 ? (
          <EmptyDeck myId={me?.id} deckUserId={deckUserId} />
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
                    Updated
                    {/* <button onClick={filterDirection}>
                <Arrow />
              </button> */}
                  </Table.HeadCell>
                  <Table.HeadCell className={s.headCell}>Grade</Table.HeadCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {cards?.items.map((card: CardItem) => {
                  return (
                    <Table.Row className={s.dataRow} key={card.id}>
                      <Table.DataCell className={s.dataCell}>{card.question}</Table.DataCell>
                      <Table.DataCell className={s.dataCell}>{card.answer}</Table.DataCell>
                      <Table.DataCell className={s.dataCell}>
                        {formatDate(card.updated)}
                      </Table.DataCell>
                      <Table.DataCell className={s.dataCell}>
                        <StarRating grade={card.grade} />
                      </Table.DataCell>
                      {card.userId === me?.id && (
                        <Table.DataCell className={`${s.dataCell}`}>
                          <div className={s.decks__createdBy_buttons}>
                            <>
                              <button /* onClick={() => openEditDialogHandler(deck.id)} */>
                                <Edit />
                              </button>
                              <button /* onClick={() => openDeleteDialogHandler(deck.id)} */>
                                <Delete />
                              </button>
                            </>
                          </div>
                        </Table.DataCell>
                      )}
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table.Root>
          </>
        )}
      </div>
    </WrapperHeader>
  )
}

export default Cards

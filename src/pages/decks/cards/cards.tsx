import { ChangeEvent, useState } from 'react'

import { useLocation, useParams, Link } from 'react-router-dom'

import WrapperHeader from '../../../common/component/wrapper-header'
import { useAppSelector } from '../../../common/hooks/redux-hooks'
import LeftArrow from '../../../common/svg/left-arrow'
import { Button } from '../../../components/ui/button'
import EmptyDeck from '../../../components/ui/empty-deck/empty-deck'
import Input from '../../../components/ui/input/input'
import { Table } from '../../../components/ui/table/table'
import { H1 } from '../../../components/ui/typography/typography'
import { useGetCardsDeckByIdQuery } from '../../../services/decks/decks'
import { CardItem } from '../../../services/decks/types'

import Card from './cardItem/cardItem'
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
                  return <Card card={card} myId={me?.id} key={card.id} />
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

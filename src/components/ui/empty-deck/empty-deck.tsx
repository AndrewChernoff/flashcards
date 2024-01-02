import s from '../../../pages/decks/cards/cards.module.scss'
import { Button } from '../button'
import { Body1 } from '../typography/typography'

type EmptyDeckProps = { myId: string | null | undefined; deckUserId: string }

const EmptyDeck = ({ myId, deckUserId }: EmptyDeckProps) => {
  return (
    <div className={s.cards__empty}>
      <Body1>
        This pack is empty. {myId === deckUserId && 'Click add new card to fill this pack'}
      </Body1>
      {myId === deckUserId && <Button variant="purple">Add New Card</Button>}
    </div>
  )
}

export default EmptyDeck

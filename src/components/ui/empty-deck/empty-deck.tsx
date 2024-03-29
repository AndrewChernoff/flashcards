import { Button } from '../button'
import AddCardDialog from '../modal/add-card-dialog/add-card-dialog'
import { Body1 } from '../typography/typography'

import { useAppDispatch, useAppSelector } from '@/common/hooks/redux-hooks'
import s from '@/pages/decks/cards/cards.module.scss'
import { closeDialog, openDialog } from '@/services/cards/cards-slice'

type EmptyDeckProps = { myId: string | null | undefined; deckUserId: string; deckId: string }

const EmptyDeck = ({ myId, deckUserId, deckId }: EmptyDeckProps) => {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(state => state.card.isOpen)

  const closeDialogHandler = () => dispatch(closeDialog({}))
  const openDialogHandler = () => dispatch(openDialog({}))

  return (
    <>
      <div className={s.cards__empty}>
        <Body1>
          This pack is empty. {myId === deckUserId && 'Click add new card to fill this pack'}
        </Body1>
        {myId === deckUserId && (
          <Button variant="purple" callBack={openDialogHandler}>
            Add New Card
          </Button>
        )}
      </div>
      <AddCardDialog isOpen={isOpen} deckId={deckId} closeDialog={closeDialogHandler} />
    </>
  )
}

export default EmptyDeck

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/redux-hooks'
import { getDeck } from '../../../../services/decks/cards-slice'
import { CardItem } from '../../../../services/decks/types'
import { Button } from '../../button'
import { Body2, H2, Subtitle1 } from '../../typography/typography'
import Modal from '../modal'

import s from './cardDialog.module.scss'

type AddDeckDialogType = {
  isOpen: boolean
  closeDialog: (value: boolean) => void
  card: CardItem | null | undefined
}

const CardDialog = ({ isOpen, closeDialog, card }: AddDeckDialogType) => {
  const deck = useAppSelector(state => state.deck.deck)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(getDeck(null))
    closeDialog(false)
  }

  return (
    <Modal isOpen={isOpen} callBack={handleClose}>
      <div className={s.card}>
        <div className={s.card__container}>
          <H2>Learn &#34;{deck?.name}&#34;</H2>
          <div className={s.card__content}>
            {deck?.cardsCount === 0 ? (
              <Subtitle1 className={s.card__question}>
                There is no cards. Go back to decks list and learn another one
              </Subtitle1>
            ) : (
              <>
                <p className={s.card__question}>Question: {card?.question} </p>
                {card?.shots && (
                  <Body2 className={s.card__shots}>
                    Количество попыток ответов на вопрос: {card.shots}
                  </Body2>
                )}
                <Button variant="purple" fullWidth={true} className={s.card__showAnswer_btn}>
                  Show Answer
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CardDialog

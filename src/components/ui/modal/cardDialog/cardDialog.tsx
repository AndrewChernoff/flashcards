import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/redux-hooks'
import { getDeck } from '../../../../services/decks/cards-slice'
import { useRateCardMutation } from '../../../../services/decks/decks'
import { CardItem, DeckItemType } from '../../../../services/decks/types'
import { Button } from '../../button'
import RadioGroup from '../../radio-group/radio-group'
import { Body2, H2, Subtitle1 } from '../../typography/typography'
import Modal from '../modal'

import s from './cardDialog.module.scss'

type AddDeckDialogType = {
  isOpen: boolean
  closeDialog: (value: boolean) => void
  card: CardItem | null | undefined
  requestCard: (id: string) => void
}

const CardDialog = ({ isOpen, closeDialog, card, requestCard }: AddDeckDialogType) => {
  const deck = useAppSelector(state => state.deck.deck)
  const dispatch = useAppDispatch()
  const [isAnswerShown, setIsAnswerShown] = useState<boolean>(false)

  const handleClose = () => {
    dispatch(getDeck(null))
    closeDialog(false)
  }

  const getAnotherQuestion = (id: string) => requestCard(id)

  return (
    <Modal isOpen={isOpen} callBack={handleClose}>
      <div className={s.card}>
        <div className={s.card__container}>
          <H2>Learn &#34;{deck?.name}&#34;</H2>
          <div className={s.card__content}>
            {deck?.cardsCount === 0 ? (
              <NoCards />
            ) : (
              <>
                <p className={s.card__question}>Question: {card?.question} </p>
                <Body2 className={s.card__shots}>
                  Количество попыток ответов на вопрос: {card?.shots}
                </Body2>

                {!isAnswerShown && (
                  <Button
                    variant="purple"
                    callBack={() => setIsAnswerShown(!isAnswerShown)}
                    fullWidth={true}
                    className={s.card__showAnswer_btn}
                  >
                    Show Answer
                  </Button>
                )}

                {deck && (
                  <ShowAnswer
                    isShown={isAnswerShown}
                    card={card}
                    deckId={deck?.id}
                    showAnother={() => {
                      setIsAnswerShown(false)
                      getAnotherQuestion(deck.id)
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

const ShowAnswer = ({ isShown, card, showAnother }: any) => {
  const deck = useAppSelector(state => state.deck.deck) /// then get it from props from parent

  const [cardRating, setCardRating] = useState<string>('0')

  const [rateCard] = useRateCardMutation()

  const handleRateCard = (deckId: any, grade: string, cardId: string) =>
    rateCard({ deckId, cardId, grade })

  if (isShown) {
    return (
      <>
        <p>Answer: {card?.answer}</p>
        Rate yourself:
        <RadioGroup isDisabled={false} callBack={setCardRating} />
        <Button
          variant="purple"
          callBack={() => {
            handleRateCard((deck as DeckItemType).id, cardRating, card.id)
            showAnother()
          }}
          fullWidth={true}
          className={s.card__showAnswer_btn}
        >
          Next question
        </Button>
      </>
    )
  } else {
    return null
  }
}

const NoCards = () => {
  return (
    <Subtitle1 className={s.card__question}>
      There is no cards. Go back to decks list and learn another one
    </Subtitle1>
  )
}

export default CardDialog

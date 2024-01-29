import { useState } from 'react'

import { Button } from '../../button'
import RadioGroup from '../../radio-group/radio-group'
import { Body2, H2, Subtitle1 } from '../../typography/typography'
import Modal from '../modal'

import s from './card-dialog.module.scss'

import { useRateCardMutation } from '@/services/cards/cards'
import { useGetDeckByIdQuery } from '@/services/decks/decks'
import { CardItem } from '@/services/decks/types'

type AddDeckDialogType = {
  isOpen: boolean
  closeDialog: (value: boolean) => void
  card: CardItem | null | undefined
  requestCard: (id: string) => void
  deckId: string
}
/*This Modal is for showing card when we to learn the cards from deck, question apeares in Card modal */

const CardDialog = ({ isOpen, closeDialog, card, requestCard, deckId }: AddDeckDialogType) => {
  const [isAnswerShown, setIsAnswerShown] = useState<boolean>(false)

  const { data: deck } = useGetDeckByIdQuery({ id: deckId })

  const handleClose = () => {
    setIsAnswerShown(false)
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
                <p className={s.card__question}>Question: {card?.question}</p>
                {card?.questionImg && (
                  <img src={card?.questionImg} alt={'answer image'} className={s.card__img} />
                )}
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
                    deckId={deckId}
                    showAnother={() => {
                      setIsAnswerShown(false)
                      getAnotherQuestion(deckId)
                    }}
                    deck={deck}
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

const ShowAnswer = ({ isShown, card, showAnother, deck }: any) => {
  const [cardRating, setCardRating] = useState<string>('0')

  const [rateCard] = useRateCardMutation()

  const handleRateCard = (deckId: any, grade: string, cardId: string) => {
    rateCard({ deckId, cardId, grade })
  }

  if (isShown) {
    return (
      <>
        <p>Answer: {card?.answer}</p>
        {card?.answerImg && (
          <img src={card?.answerImg} alt={'answer image'} className={s.card__img} />
        )}
        <p>Rate yourself:</p>
        <RadioGroup isDisabled={false} callBack={setCardRating} />
        <Button
          variant="purple"
          callBack={() => {
            handleRateCard(deck.id, cardRating, card.id)
            showAnother()
          }}
          disabled={cardRating === '0'}
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

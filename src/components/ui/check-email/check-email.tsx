import checkEmail from '../../../common/imgs/check-email.png'
import { Button } from '../button'
import Card from '../card/card'

import s from './check-email.module.scss'

const CheckEmail = () => {
  return (
    <Card>
      <form className={s.form}>
        <h2 className={s.form__title}>Check Email</h2>
        <img src={checkEmail} alt="check email" />
        <h3>We’ve sent an Email with instructions to example@mail.com</h3>

        <Button
          variant="purple"
          as={'a'}
          className={s.form__link}
          href={'https://api.flashcards.andrii.es/docs#/Auth/AuthController_registration'}
          type="submit"
          fullWidth={true}
        >
          Back to Sign In
        </Button>
      </form>
    </Card>
  )
}

export default CheckEmail

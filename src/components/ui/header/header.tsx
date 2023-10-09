import logo from '../../../common/imgs/logo.png'
import { Button } from '../button'

import s from './header.module.scss'

type HeaderProps = {
  isAuth: boolean
}

function Header({ isAuth }: HeaderProps) {
  return (
    <header className={s.header}>
      <img src={logo} alt="incubator logo" />
      {!isAuth ? (
        <Button className="purple" as="button" variant="purple">
          Sign In
        </Button>
      ) : (
        <div className={s.header__userInfo}>
          <p>Andrew</p>
          <img src="https://avatars.githubusercontent.com/u/79928353?v=4" alt="user ava" />
        </div>
      )}
    </header>
  )
}

export default Header

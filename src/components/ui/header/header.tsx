import logo from '../../../common/imgs/logo.png'
import { Button } from '../button'

import s from './header.module.scss'

type UserData = {
  avatar: null
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

type HeaderProps = {
  isAuth: boolean
  user: UserData
}

function Header({ isAuth, user }: HeaderProps) {
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
          {user.avatar ? (
            <img src={user.avatar} alt="user ava" />
          ) : (
            <img
              src="https://winaero.com/blog/wp-content/uploads/2018/08/Windows-10-user-icon-big.png"
              alt="user ava"
            />
          )}
        </div>
      )}
    </header>
  )
}

export default Header

import logo from '../../../common/imgs/logo.png'
import { Button } from '../button'

import s from './header.module.scss'

type UserData = {
  avatar: string | null
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

type HeaderProps = {
  user: UserData | IsSuccess
}

type IsSuccess = { success: boolean }

function isSuccess(user: UserData | IsSuccess): user is IsSuccess {
  return (user as IsSuccess).success === false
}

function Header({ user }: HeaderProps) {
  return (
    <header className={s.header}>
      <img src={logo} alt="incubator logo" />
      {user && isSuccess(user) ? (
        <Button className="purple" as="button" variant="purple">
          Sign In
        </Button>
      ) : (
        <div className={s.header__userInfo}>
          {
            user && 'avatar' in user && (
              <>
                <p>{user.name}</p>
                <img
                  src={
                    !user.avatar
                      ? 'https://winaero.com/blog/wp-content/uploads/2018/08/Windows-10-user-icon-big.png'
                      : user.avatar
                  }
                  alt="user ava"
                />
              </>
            ) /*  */
          }
        </div>
      )}
    </header>
  )
}

export default Header

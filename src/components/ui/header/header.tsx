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
  const path = window.location.pathname

  const returnedUrl = () => {
    if (path === '/signin') {
      return 'signup'
    } else if (path === '/signup') {
      return 'signin'
    }
  }

  return (
    <header className={s.header}>
      <img src={logo} alt="incubator logo" />
      {user && isSuccess(user) ? (
        <Button
          //className="purple"
          as="a"
          //href={'/signup'}
          href={returnedUrl()}
          variant="purple"
          className={s.header__link}
        >
          {path === '/signin' ? 'Sign Up' : path === '/signup' && 'Sign in'}
        </Button>
      ) : (
        <div className={s.header__userInfo}>
          {user && 'avatar' in user && (
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
          )}
        </div>
      )}
    </header>
  )
}

export default Header

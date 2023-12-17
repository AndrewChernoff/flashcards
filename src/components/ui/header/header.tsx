import { useEffect, useState } from 'react'

import logo from '../../../common/imgs/logo.png'
import noava from '../../../common/imgs/noAvaUser.png'
import { Button } from '../button'
import Dropdown from '../dropdown/dropdown'

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
  const [path, setPath] = useState<string>('/signin')

  useEffect(() => {
    const pathName = window.location.pathname

    if (pathName === '/signin') {
      return setPath('/signup')
    } else if (pathName === '/signup') {
      return setPath('/signin')
    }
  }, [])

  return (
    <header className={s.header}>
      <img src={logo} alt="incubator logo" />
      {user && isSuccess(user) ? (
        <Button as="a" href={path} variant="purple" className={s.header__link}>
          {path === '/signin' ? 'Sign Up' : path === '/signup' && 'Sign in'}
        </Button>
      ) : (
        <div className={s.header__info}>
          {user && 'avatar' in user && (
            <Dropdown name={user.name} email={user.email} img={!user.avatar ? noava : user.avatar}>
              <div className={s.header__info_user}>
                <p>{user.name}</p>
                <img src={!user.avatar ? noava : user.avatar} alt="user ava" />
              </div>
            </Dropdown>
          )}
        </div>
      )}
    </header>
  )
}

export default Header

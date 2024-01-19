import { useEffect, useState } from 'react'

import { Button } from '../button'
import Dropdown from '../dropdown/dropdown'

import s from './header.module.scss'
import ProfileDialog from './profileDialog/profileDialog'

import logo from '@/common/imgs/logo.png'
import noava from '@/common/imgs/noAvaUser.png'

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
  user: UserData | IsSuccess | null
}

type IsSuccess = { success: boolean }

function isSuccess(user: UserData | IsSuccess): user is IsSuccess {
  return (user as IsSuccess).success === false
}

/* this component is wrapped with WrapperHeader component from 'common' folder*/

const Header = ({ user }: HeaderProps) => {
  const [path, setPath] = useState<string>('/signin')
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false)

  useEffect(() => {
    const pathName = window.location.pathname

    if (pathName === '/signin') {
      return setPath('/signup')
    } else if (pathName === '/signup') {
      return setPath('/signin')
    }
  }, [])

  const openProfileDialogHandler = () => setIsProfileOpen(!isProfileOpen)

  return (
    <>
      <header className={s.header}>
        <div className={s.header__container}>
          <img src={logo} alt="incubator logo" />
          {user && isSuccess(user) ? (
            <Button as="a" href={path} variant="purple" className={s.header__link}>
              {path === '/signin' ? 'Sign Up' : path === '/signup' && 'Sign in'}
            </Button>
          ) : (
            <div className={s.header__info}>
              {user && 'avatar' in user && (
                <Dropdown
                  name={user.name}
                  email={user.email}
                  img={!user.avatar ? noava : user.avatar}
                  openProfileDialog={openProfileDialogHandler}
                >
                  <div className={s.header__info_user}>
                    <p>{user.name}</p>
                    <img src={!user.avatar ? noava : user.avatar} alt="user ava" />
                  </div>
                </Dropdown>
              )}
            </div>
          )}
        </div>
      </header>
      <ProfileDialog isOpen={isProfileOpen} openDialog={openProfileDialogHandler} />
    </>
  )
}

export default Header

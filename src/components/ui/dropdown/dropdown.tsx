import { ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { useAppDispatch } from '../../../common/hooks/redux-hooks'
import { useLogOutMutation } from '../../../services/auth/auth'
import { Caption, Subtitle2 } from '../typography/typography'

import s from './dropdown.module.scss'

type DropdownProps = {
  children: ReactNode
  img: string
  name: string
  email: string
  openProfileDialog: () => void
}

const Dropdown = ({ children, img, email, name, openProfileDialog }: DropdownProps) => {
  const dispatch = useAppDispatch()
  const [logOut] = useLogOutMutation()

  const onLogoutHandler = () => {
    logOut()
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.dropdown}>
          <DropdownMenu.Item className={s.dropdown__item}>
            <div className={s.user}>
              <img src={img} alt="user avatar" />
              <div className={s.user__info}>
                <Subtitle2 className={s.user__info_name}>{name}</Subtitle2>
                <Caption className={s.user__info_email}>{email}</Caption>
              </div>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={s.dropdown__item} onClick={openProfileDialog}>
            <ProfileImg />
            <Caption className={s.dropdown__item_profile}>My profile</Caption>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={s.dropdown__item}>
            <button onClick={onLogoutHandler}>
              <SignOutImg />
              <Caption className={s.dropdown__item_profile}>Sign Out</Caption>
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

const ProfileImg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8.00004 7.33431C8.52746 7.33431 9.04303 7.17791 9.48156 6.8849C9.92009 6.59188 10.2619 6.1754 10.4637 5.68813C10.6656 5.20086 10.7184 4.66469 10.6155 4.1474C10.5126 3.63012 10.2586 3.15497 9.88566 2.78203C9.51272 2.40909 9.03756 2.15511 8.52028 2.05222C8.003 1.94932 7.46682 2.00213 6.97955 2.20397C6.49228 2.4058 6.07581 2.74759 5.78279 3.18612C5.48977 3.62465 5.33337 4.14023 5.33337 4.66764C5.33337 5.37489 5.61433 6.05317 6.11442 6.55326C6.61452 7.05336 7.2928 7.33431 8.00004 7.33431ZM8.00004 3.33431C8.26375 3.33431 8.52154 3.41251 8.7408 3.55902C8.96007 3.70553 9.13096 3.91376 9.23188 4.1574C9.3328 4.40103 9.3592 4.66912 9.30775 4.92776C9.25631 5.18641 9.12932 5.42398 8.94285 5.61045C8.75638 5.79692 8.5188 5.92391 8.26016 5.97536C8.00152 6.0268 7.73343 6.0004 7.4898 5.89948C7.24616 5.79857 7.03792 5.62767 6.89141 5.4084C6.74491 5.18914 6.66671 4.93135 6.66671 4.66764C6.66671 4.31402 6.80718 3.97488 7.05723 3.72484C7.30728 3.47479 7.64642 3.33431 8.00004 3.33431Z"
        fill="white"
      />
      <path
        d="M8.00004 8.66766C6.76236 8.66766 5.57538 9.15933 4.70021 10.0345C3.82504 10.9097 3.33337 12.0967 3.33337 13.3343C3.33337 13.5111 3.40361 13.6807 3.52864 13.8057C3.65366 13.9308 3.82323 14.001 4.00004 14.001C4.17685 14.001 4.34642 13.9308 4.47145 13.8057C4.59647 13.6807 4.66671 13.5111 4.66671 13.3343C4.66671 12.4503 5.0179 11.6024 5.64302 10.9773C6.26814 10.3522 7.11599 10.001 8.00004 10.001C8.8841 10.001 9.73194 10.3522 10.3571 10.9773C10.9822 11.6024 11.3334 12.4503 11.3334 13.3343C11.3334 13.5111 11.4036 13.6807 11.5286 13.8057C11.6537 13.9308 11.8232 14.001 12 14.001C12.1769 14.001 12.3464 13.9308 12.4714 13.8057C12.5965 13.6807 12.6667 13.5111 12.6667 13.3343C12.6667 12.0967 12.175 10.9097 11.2999 10.0345C10.4247 9.15933 9.23772 8.66766 8.00004 8.66766Z"
        fill="white"
      />
    </svg>
  )
}

const SignOutImg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4.66663 4.001C4.84344 4.001 5.01301 3.93076 5.13803 3.80573C5.26305 3.68071 5.33329 3.51114 5.33329 3.33433C5.33329 3.15752 5.26305 2.98795 5.13803 2.86293C5.01301 2.7379 4.84344 2.66766 4.66663 2.66766H3.33329C3.15648 2.66766 2.98691 2.7379 2.86189 2.86293C2.73686 2.98795 2.66663 3.15752 2.66663 3.33433V12.6677C2.66663 12.8445 2.73686 13.014 2.86189 13.1391C2.98691 13.2641 3.15648 13.3343 3.33329 13.3343H4.66663C4.84344 13.3343 5.01301 13.2641 5.13803 13.1391C5.26305 13.014 5.33329 12.8445 5.33329 12.6677C5.33329 12.4909 5.26305 12.3213 5.13803 12.1963C5.01301 12.0712 4.84344 12.001 4.66663 12.001H3.99996V4.001H4.66663Z"
        fill="white"
      />
      <path
        d="M13.88 7.6143L12 4.94763C11.898 4.80391 11.7433 4.70639 11.5697 4.67641C11.396 4.64643 11.2176 4.68642 11.0733 4.78763C11.0012 4.83815 10.9399 4.90246 10.8927 4.97683C10.8456 5.05121 10.8137 5.13418 10.7988 5.22095C10.784 5.30773 10.7864 5.39659 10.8061 5.48241C10.8257 5.56823 10.8622 5.64931 10.9133 5.72096L12.06 7.3343H6.66667C6.48986 7.3343 6.32029 7.40454 6.19526 7.52956C6.07024 7.65458 6 7.82415 6 8.00096C6 8.17778 6.07024 8.34734 6.19526 8.47237C6.32029 8.59739 6.48986 8.66763 6.66667 8.66763H12L10.8 10.2676C10.7475 10.3377 10.7093 10.4174 10.6875 10.5022C10.6658 10.587 10.661 10.6752 10.6734 10.7619C10.6857 10.8486 10.7151 10.932 10.7597 11.0073C10.8043 11.0826 10.8633 11.1484 10.9333 11.201C11.0487 11.2875 11.1891 11.3343 11.3333 11.3343C11.4368 11.3343 11.5389 11.3102 11.6315 11.2639C11.724 11.2176 11.8046 11.1504 11.8667 11.0676L13.8667 8.40096C13.952 8.28821 13.9994 8.15122 14.0018 8.00981C14.0041 7.86839 13.9615 7.72988 13.88 7.6143Z"
        fill="white"
      />
    </svg>
  )
}

export default Dropdown

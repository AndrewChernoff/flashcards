import { useRef, useState } from 'react'

import noUserAva from '../../../common/imgs/noAvaUser.png'
import { useLogOutMutation } from '../../../services/auth/auth'
import { Button } from '../button'
import { H2 } from '../typography/typography'

import EditName from './edit-name/edit-name'
import EditPhoto from './edit-photo/edit-photo'
import s from './personal-info.module.scss'

type PersonalInfoProps = {
  name: string
  email: string
  ava: string | null
}

const PersonalInfo = ({ name, email, ava }: PersonalInfoProps) => {
  const [editName, setEditName] = useState<boolean>(false)
  const [editPhoto, setEditPhoto] = useState<boolean>(false)
  const inputName = useRef<HTMLInputElement>(null)
  const [logOut] = useLogOutMutation()

  const changeToEditName = () => {
    setEditName(!editName)
  }

  const changeEditPhoto = () => {
    setEditPhoto(!editPhoto)
  }

  const onInputNameBlur = () => {
    setEditName(false)
  }

  return (
    <div className={s.card}>
      {!editName &&
        !editPhoto && ( ///if we don't edit anything
          <div className={s.info}>
            <H2 className={s.info__title}>Personal Information</H2>

            <div className={s.info__imgBlock} onClick={changeEditPhoto}>
              <img src={ava || noUserAva} alt="user ava" />
              <EditButton />
            </div>
            <h3>
              {name}
              <button onClick={changeToEditName}>
                <EditButton />
              </button>
            </h3>
            <h4>{email}</h4>
            <Button
              type="submit"
              variant={'secondary'}
              className={s.info__button}
              callBack={() => logOut()}
              fullWidth={false}
            >
              <LogoutIcon /> <p>Logout</p>
            </Button>
          </div>
        )}
      {editName && /// if we edit name
        !editPhoto && (
          <EditName
            onInputNameBlur={onInputNameBlur}
            ref={inputName}
            name={name}
            ava={ava || noUserAva}
          />
        )}

      {!editName && editPhoto && (
        <EditPhoto userAva={ava || noUserAva} changeEditPhoto={changeEditPhoto} />
      )}
    </div>
  )
}

const EditButton = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M12.6666 13.3334H3.33329C3.15648 13.3334 2.98691 13.4036 2.86189 13.5286C2.73686 13.6537 2.66663 13.8232 2.66663 14C2.66663 14.1769 2.73686 14.3464 2.86189 14.4714C2.98691 14.5965 3.15648 14.6667 3.33329 14.6667H12.6666C12.8434 14.6667 13.013 14.5965 13.138 14.4714C13.2631 14.3464 13.3333 14.1769 13.3333 14C13.3333 13.8232 13.2631 13.6537 13.138 13.5286C13.013 13.4036 12.8434 13.3334 12.6666 13.3334Z"
        fill="white"
      />
      <path
        d="M3.33329 12H3.39329L6.17329 11.7467C6.47782 11.7163 6.76264 11.5821 6.97995 11.3667L12.98 5.36665C13.2128 5.12063 13.3387 4.79233 13.3299 4.45368C13.3212 4.11503 13.1786 3.79366 12.9333 3.55999L11.1066 1.73332C10.8682 1.50938 10.5558 1.38089 10.2288 1.37229C9.90187 1.36368 9.58314 1.47557 9.33329 1.68665L3.33329 7.68665C3.1178 7.90396 2.98362 8.18879 2.95329 8.49332L2.66662 11.2733C2.65764 11.371 2.67031 11.4694 2.70373 11.5616C2.73715 11.6538 2.79049 11.7374 2.85995 11.8067C2.92225 11.8684 2.99612 11.9173 3.07735 11.9505C3.15857 11.9837 3.24555 12.0005 3.33329 12ZM10.18 2.66665L12 4.48665L10.6666 5.78665L8.87995 3.99999L10.18 2.66665ZM4.24662 8.60665L7.99995 4.87999L9.79995 6.67999L6.06662 10.4133L4.06662 10.6L4.24662 8.60665Z"
        fill="white"
      />
    </svg>
  )
}

const LogoutIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4.66663 3.99996C4.84344 3.99996 5.01301 3.92972 5.13803 3.8047C5.26305 3.67967 5.33329 3.5101 5.33329 3.33329C5.33329 3.15648 5.26305 2.98691 5.13803 2.86189C5.01301 2.73686 4.84344 2.66663 4.66663 2.66663H3.33329C3.15648 2.66663 2.98691 2.73686 2.86189 2.86189C2.73686 2.98691 2.66663 3.15648 2.66663 3.33329V12.6666C2.66663 12.8434 2.73686 13.013 2.86189 13.138C2.98691 13.2631 3.15648 13.3333 3.33329 13.3333H4.66663C4.84344 13.3333 5.01301 13.2631 5.13803 13.138C5.26305 13.013 5.33329 12.8434 5.33329 12.6666C5.33329 12.4898 5.26305 12.3202 5.13803 12.1952C5.01301 12.0702 4.84344 12 4.66663 12H3.99996V3.99996H4.66663Z"
        fill="white"
      />
      <path
        d="M13.88 7.61338L12 4.94672C11.898 4.80299 11.7433 4.70548 11.5697 4.67549C11.396 4.64551 11.2176 4.6855 11.0733 4.78672C11.0012 4.83724 10.9399 4.90154 10.8927 4.97592C10.8456 5.05029 10.8137 5.13326 10.7988 5.22004C10.784 5.30681 10.7864 5.39568 10.8061 5.4815C10.8257 5.56732 10.8622 5.64839 10.9133 5.72005L12.06 7.33338H6.66667C6.48986 7.33338 6.32029 7.40362 6.19526 7.52864C6.07024 7.65367 6 7.82324 6 8.00005C6 8.17686 6.07024 8.34643 6.19526 8.47145C6.32029 8.59648 6.48986 8.66672 6.66667 8.66672H12L10.8 10.2667C10.7475 10.3368 10.7093 10.4165 10.6875 10.5013C10.6658 10.5861 10.661 10.6743 10.6734 10.761C10.6857 10.8477 10.7151 10.931 10.7597 11.0064C10.8043 11.0817 10.8633 11.1475 10.9333 11.2C11.0487 11.2866 11.1891 11.3334 11.3333 11.3334C11.4368 11.3334 11.5389 11.3093 11.6315 11.263C11.724 11.2167 11.8046 11.1495 11.8667 11.0667L13.8667 8.40005C13.952 8.28729 13.9994 8.15031 14.0018 8.00889C14.0041 7.86748 13.9615 7.72897 13.88 7.61338Z"
        fill="white"
      />
    </svg>
  )
}

export default PersonalInfo

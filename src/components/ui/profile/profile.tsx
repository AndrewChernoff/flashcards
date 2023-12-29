import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../../common/hooks/redux-hooks'
import PersonalInfo from '../personal-info/personal-info'

const Profile = () => {
  const me = useAppSelector(state => state.auth.user)

  if (me === null) {
    return <Navigate to="/*" />
  }

  return <PersonalInfo name={me?.name} email={me?.email} ava={me?.avatar} />
}

export default Profile

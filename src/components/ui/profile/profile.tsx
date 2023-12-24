import { useGetMeQuery } from '../../../services/auth/auth'
import PersonalInfo from '../personal-info/personal-info'

const Profile = () => {
  const { data: me } = useGetMeQuery()

  return <PersonalInfo name={me.name} email={me.email} ava={me.avatar} />
}

export default Profile

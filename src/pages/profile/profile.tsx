import PersonalInfo from '../../components/ui/personal-info/personal-info'
import { useGetMeQuery } from '../../services/auth/auth'

const Profile = () => {
  const { data: me } = useGetMeQuery()

  return <PersonalInfo name={me.name} email={me.email} ava={me.avatar} />
}

export default Profile

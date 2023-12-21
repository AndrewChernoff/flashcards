import { ReactNode } from 'react'

import Header from '../../components/ui/header/header'
import { useGetMeQuery } from '../../services/auth/auth'

const WrapperHeader = ({ children }: { children: ReactNode }) => {
  const { data: me } = useGetMeQuery()

  return (
    <>
      <Header user={me} />
      {children}
    </>
  )
}

export default WrapperHeader

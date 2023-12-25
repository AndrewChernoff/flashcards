import { ReactNode } from 'react'

import Header from '../../components/ui/header/header'
import { useAppSelector } from '../hooks/redux-hooks'

const WrapperHeader = ({ children }: { children: ReactNode }) => {
  const me = useAppSelector(state => state.auth.user)

  return (
    <>
      <Header user={me} />
      {children}
    </>
  )
}

export default WrapperHeader

import Header from './components/ui/header/header'
import { Router } from './routes'
import { useGetMeQuery } from './services/auth/auth'

function App() {
  const { data: me } = useGetMeQuery()

  console.log(me)

  return (
    <>
      <Header isAuth={!!me} user={me} />
      <Router />
    </>
  )
}

export default App

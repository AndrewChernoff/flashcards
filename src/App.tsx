import Header from './components/ui/header/header'
import { Router } from './routes'
import { useGetMeQuery } from './services/auth/auth'

function App() {
  const { data: me } = useGetMeQuery()

  return (
    <>
      <Header user={me} />
      <Router />
    </>
  )
}

export default App

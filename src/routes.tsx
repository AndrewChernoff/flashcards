import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom'

import { LoginForm } from './components/ui/login-form/login-form'
import SignUp from './components/ui/sign-up/sign-up'
import Decks from './pages/decks/decks'
import PaginationPage from './pages/paginationPage/paginationPage'
import { useGetMeQuery } from './services/auth/auth'

const privateRoutes = [
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
  {
    path: '/decks',
    element: <Decks />,
  },
]

const publicRoutes = [
  {
    path: '/signin',
    element: <LoginForm />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/pagination',
    element: <PaginationPage />,
  },
]

const PrivateRoute = () => {
  const { data: me, isLoading: isMeLoading } = useGetMeQuery()

  const isAuth = me

  if (isMeLoading) return <div>Loading...</div>

  return isAuth?.success === false ? <Navigate to="/signin" /> : <Outlet />
}

const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: privateRoutes,
  },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}

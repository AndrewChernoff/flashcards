import { useEffect } from 'react'

import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom'

import { useAppDispatch } from './common/hooks/redux-hooks'
import CreatePassword from './components/ui/create-password/create-password'
import ForgotPassword from './components/ui/forgot-password/forgot-password'
import { Loader } from './components/ui/loader/loader'
import { LoginForm } from './components/ui/login-form/login-form'
import NotFound from './components/ui/not-found/not-found'
import SignUp from './components/ui/sign-up/sign-up'
import DeckItem from './pages/decks/cards/cards'
import Decks from './pages/decks/decks'
import { useGetMeQuery } from './services/auth/auth'
import { getUserData } from './services/auth/auth-slice'

const privateRoutes = [
  /* {
    path: '/',
    element: <div>Hello world!</div>,
  }, */
  {
    path: '/decks',
    element: <Decks />,
  },
  {
    path: '/decks/:id/cards',
    element: <DeckItem />,
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
  { path: '/recover-password', element: <ForgotPassword /> },
  { path: '/reset-password/:token', element: <CreatePassword /> },
  {
    path: '/*',
    element: <NotFound />,
  },
]

const PrivateRoute = () => {
  const dispatch = useAppDispatch()
  const { data: me, isLoading: isMeLoading } = useGetMeQuery()

  const isAuth = me

  useEffect(() => {
    dispatch(getUserData(me))
  }, [me])

  if (isMeLoading) return <Loader />

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

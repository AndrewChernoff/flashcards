import { useEffect } from 'react'

import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom'

import { useAppDispatch } from './common/hooks/redux-hooks'
import { Loader } from './components/ui/loader/loader'
import SignUp from './components/ui/sign-up/sign-up'
import CreatePassword from './pages/create-password/create-password'
import DeckItem from './pages/decks/cards/cards'
import Decks from './pages/decks/decks'
import ForgotPassword from './pages/forgot-password/forgot-password'
import NotFound from './pages/not-found/not-found'
import { useGetMeQuery } from './services/auth/auth'
import { getUserData } from './services/auth/auth-slice'
import { SignIn } from './pages/login-form/signin'

const privateRoutes = [
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
    path: '/',
    element: <SignIn />,
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

  return isAuth?.success === false ? <Navigate to="/" /> : <Outlet />
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

import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom'

import { LoginForm } from './components/ui/login-form/login-form'
import SignUp from './components/ui/sign-up/sign-up'
import Decks from './pages/decks'

const privateRoutes = [
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
]

const publicRoutes = [
  {
    path: '/login',
    element: <div>Login</div>,
  },
  {
    path: '/2',
    element: <div>2</div>,
  },
  {
    path: '/decks',
    element: <Decks />,
  },
  {
    path: '/signin',
    element: <LoginForm />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]

const PrivateRoute = () => {
  const isAuth = true

  return isAuth ? <Outlet /> : <Navigate to="/login" />
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

export type SignInType = {
  password: string
  email: string
  rememberMe?: boolean
}

export type UserType = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

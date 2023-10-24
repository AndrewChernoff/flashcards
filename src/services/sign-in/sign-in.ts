import { baseApi } from '../base-api'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      logIn: builder.mutation<SignInType, any>({
        query(signInObj) {
          return {
            url: `v1/auth/login`,
            method: 'POST',
            body: { signInObj },
          }
        },
      }),
    }
  },
})

export const { useLogInMutation } = authApi

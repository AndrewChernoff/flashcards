import { baseApi } from '../base-api'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      logIn: builder.mutation<SignInType, any>({
        query(signInObj) {
          return {
            url: `v1/auth/login`,
            method: 'POST',
            body: signInObj,
          }
        },
      }),
      signup: builder.mutation<any, any>({
        query(signUpObj) {
          return {
            url: `v1/auth/sign-up`,
            method: 'POST',
            body: signUpObj,
          }
        },
      }),
    }
  },
})

export const { useLogInMutation, useSignupMutation } = authApi

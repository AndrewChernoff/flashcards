import { baseApi } from '../base-api'

import { SignInType, UserType } from './types'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getMe: builder.query<any, void>({
        async queryFn(_name, _api, _extraOptions, baseQuery) {
          const result = await baseQuery({
            url: `v1/auth/me`,
            method: 'GET',
          })

          if (result.error) {
            // but refetch on another error
            return { data: { success: false } }
          }

          return { data: result.data as any }
        },
        providesTags: ['Me'],
      }),
      logIn: builder.mutation<SignInType, any>({
        query(signInObj) {
          return {
            url: `v1/auth/login`,
            method: 'POST',
            body: signInObj,
          }
        },
        invalidatesTags: ['Me'],
      }),
      logOut: builder.mutation<void, void>({
        query() {
          return {
            url: `v1/auth/logout`,
            method: 'POST',
          }
        },
        invalidatesTags: ['Me'],
      }),
      signup: builder.mutation<UserType, any>({
        query(signUpObj) {
          return {
            url: `v1/auth/sign-up`,
            method: 'POST',
            body: signUpObj,
          }
        },
        invalidatesTags: ['Me'],
      }),
      patchMe: builder.mutation<any, { avatar?: File; name?: string; email?: string }>({
        query(data) {
          return {
            url: `v1/auth/me`,
            method: 'PATCH',
            body: data,
          }
        },
        invalidatesTags: ['Me'],
      }),
      recoverPassword: builder.mutation<void, { email: string }>({
        query(data) {
          return {
            url: `/v1/auth/recover-password`,
            method: 'POST',
            body: {
              html: '<h1>Hi, ##name##</h1><p>Click <a href="https://flashcards-owrzzvdzp-andrewchernoff.vercel.app//reset-password/##token##">here</a> to recover your password</p>',
              email: data.email,
            },
          }
        },
        invalidatesTags: ['Me'],
      }),
      resetPassword: builder.mutation<void, { password: string; token: string }>({
        query(data) {
          return {
            url: `/v1/auth/reset-password/${data.token}`,
            method: 'POST',
            body: {
              password: data.password,
            },
          }
        },
        invalidatesTags: ['Me'],
      }),
    }
  },
})

export const {
  useLogInMutation,
  useSignupMutation,
  useGetMeQuery,
  useLogOutMutation,
  usePatchMeMutation,
  useRecoverPasswordMutation,
  useResetPasswordMutation,
} = authApi

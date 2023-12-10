import { baseApi } from '../base-api'

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
        /* query() {
          return {
            url: `v1/auth/me`,
            method: 'GET',
          }
        },
        providesTags: ['Me'], */
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
      signup: builder.mutation<User, any>({
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

export const { useLogInMutation, useSignupMutation, useGetMeQuery, useLogOutMutation } = authApi

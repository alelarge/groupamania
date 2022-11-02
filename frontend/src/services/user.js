import { retry } from '@reduxjs/toolkit/query/react'
import { api } from './api'

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: 'user/login',
        method: 'POST',
        body: credentials,
      }),
      extraOptions: {
        backoff: () => {
          // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
          retry.fail({ fake: 'error' })
        },
      },
    }),
    signup: build.mutation({
      query: (body) => ({
        url: 'user/signup',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});


export const {
  useLoginMutation,
  useSignupMutation,
} = userApi

export const {
  endpoints: { login },
} = userApi

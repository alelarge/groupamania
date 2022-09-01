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
    }),
});

export const {
    // useAddPostMutation,
    // useDeletePostMutation,
    // useGetPostQuery,
    // useGetPostsQuery,
    useLoginMutation,
    //useUpdatePostMutation,
    //useGetErrorProneQuery,
  } = userApi
  
  export const {
    endpoints: { login },
  } = userApi
  
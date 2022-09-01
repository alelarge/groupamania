import { retry } from '@reduxjs/toolkit/query/react'
import { api } from './api'

export const postApi = api.injectEndpoints({
    endpoints: (build) => ({
        getPosts: build.mutation({
            query: (credentials) => ({
              url: 'post',
              method: 'GET',
            }),
          }),
    }),
});

export const {
    // useAddPostMutation,
    // useDeletePostMutation,
    // useGetPostQuery,
    useGetPostsQuery,
    useGetPostsMutation,
    //useUpdatePostMutation,
    //useGetErrorProneQuery,
  } = postApi
  
  export const {
    endpoints: { getPosts },
  } = postApi
  
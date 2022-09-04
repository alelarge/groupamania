import { retry } from '@reduxjs/toolkit/query/react'
import { api } from './api'

export const postApi = api.injectEndpoints({
    endpoints: (build) => ({
        getPosts: build.query({
            query: () => ({
              url: 'post',
              method: 'GET',
            }),
            providesTags: (_post, _err, id) => [{ type: 'Posts', id }],
        }),
        addPost: build.mutation({
            query: (body) => ({
              url: 'post',
              method: 'POST',
              body,
            }),
            invalidatesTags: ['Posts'],
        }),
    }),
});

export const {
    useAddPostMutation,
    // useDeletePostMutation,
    // useGetPostQuery,
    useGetPostsQuery,
    useGetPostsMutation,
    //useUpdatePostMutation,
    useGetErrorProneQuery,
  } = postApi
  
  export const {
    endpoints: { getPosts },
  } = postApi
  
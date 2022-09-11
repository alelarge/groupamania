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
              headers: {
                //'content-type': 'multipart/form-data',
              },
              body,
            }),
            invalidatesTags: ['Posts'],
        }),
        modifyPost: build.mutation({
          query: (body, id) => ({
            url: `post/${id}`,
            method: 'PUT',
            body,
          }),
          invalidatesTags: ['Posts'],
        }),
        deletePost: build.mutation({
          query: (id) => ({
            url: `post/${id}`,
            method: 'DELETE',
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
  
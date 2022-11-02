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
        headers: {},
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
    modifyPost: build.mutation({
      query: (data) => ({
        url: `post/${data.id}`,
        method: 'PUT',
        body: data.body,
      }),
      invalidatesTags: ['Posts'],
    }),
    getOnePost: build.query({
      query: (id) => ({
        url: `post/${id}`,
        method: 'GET',
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
    likePost: build.mutation({
      query: (id) => ({
        url: `post/${id}/like`,
        method: 'POST',
        body: {
          like: 1
        },
      }),
      invalidatesTags: ['Posts'],
    }),
    unlikePost: build.mutation({
      query: (id) => ({
        url: `post/${id}/like`,
        method: 'POST',
        body: {
          like: 0
        },
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const {
  useAddPostMutation,
  useGetOnePostQuery,
  useModifyPostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useGetPostsMutation,
  useGetErrorProneQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} = postApi

export const {
  endpoints: { getPosts },
} = postApi

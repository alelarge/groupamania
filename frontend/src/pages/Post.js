import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoggedIn from "../layouts/LoggedIn";
import {
  useAddPostMutation,
  useGetPostsQuery,
  useGetErrorProneQuery,
} from './../services/post'
// import './PostsManager.css'

export const AddPost = () => {
  const initialValue = { name: '' }
  const [post, setPost] = useState(initialValue)
  const [addPost, { isLoading }] = useAddPostMutation()

  const handleChange = ({ target }) => {
    setPost((prev) => ({
      ...prev,
      [target.name]: target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addPost(post)
    setPost(initialValue)
  }

  return (
    <LoggedIn>
      <form onSubmit={handleSubmit}>
        {/* <div className="row"> */}
          {/* <div className="column column-3"> */}
            <input
              name="name"
              placeholder="New post name"
              type="text"
              onChange={handleChange}
              value={post.name}
            />
          {/* </div> */}
          {/* <div className="column column-1"> */}
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Post'}
            </button>
          {/* </div> */}
        {/* </div> */}
      </form>
    </LoggedIn>
  )
}

const PostListItem = (data, onSelect) => {
  return (
    <li>
      <a href="#" onClick={() => onSelect(data.id)}>
        {data.name}
      </a>
    </li>
  )
}

const PostList = () => {
  const { data: posts, isLoading } = useGetPostsQuery()
  const navigate = useNavigate()

  if (isLoading) {
    return <div>Loading</div>
  }

  if (!posts) {
    return <div>No posts :(</div>
  }

  return (
    <div>
      {posts.map((post) => (
        <PostListItem
          key={post.id}
          data={post}
          onSelect={(id) => navigate(`/posts/${id}`)}
        />
      ))}
    </div>
  )
}

export const Post = () => {
  const [initRetries, setInitRetries] = useState(false)
  const { data, error, isFetching } = useGetErrorProneQuery(undefined, {
    skip: !initRetries,
  })
  const dispatch = useDispatch()

  return (
    <div>
      <h3>Posts</h3>
      <button onClick={() => setInitRetries(true)}>
        {isFetching ? 'retrying...' : 'Start error prone retries'}
      </button>
      <hr />
      <div className="row">
        <div className="posts-list">
          <AddPost />
          <hr />
          Posts:
          <PostList />
          <hr />
          List with duplicate subscription:
          <PostList />
        </div>
        </div>
      </div>
    // </div>
  )
}

export default Post

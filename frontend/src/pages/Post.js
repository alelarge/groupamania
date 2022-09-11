import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoggedIn from "../layouts/LoggedIn";
import {
  useAddPostMutation,
  useGetPostsQuery,
  useGetErrorProneQuery,
} from './../services/post'
import {
  useSignupMutation,
} from '../services/user'
// import './PostsManager.css'

export const AddPost = () => {
  const initialValue = { title: '', content: '' }
  const [image, setImage] = useState();
  const [post, setPost] = useState(initialValue)
  const [addPost, { isLoading }] = useAddPostMutation()

  const handleChange = ({ target }) => {
    setPost((prev) => ({
      ...prev,
      [target.name]: target.value,
    }))
  }

  const handleChangeImage = ({ target }) => {
    console.log('file', target.files);
    setImage(target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newPost = new FormData();    
    newPost.append("image", image, "burrata-cremeuse.jpeg");
    newPost.append("post", JSON.stringify(post));

    await addPost(newPost)
    setPost(initialValue)
  }

  return (
    <LoggedIn>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="New post name"
          type="text"
          onChange={handleChange}
          value={post.title}
        />
        <textarea 
          name="content" 
          onChange={handleChange}
          value={post.content}
        >
        </textarea>
        <input type="file" name="image" onChange={handleChangeImage}></input>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Post'}
        </button>
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

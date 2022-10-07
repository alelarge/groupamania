import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import LoggedIn from "../layouts/LoggedIn";
import {
  useAddPostMutation,
  useModifyPostMutation,
  useGetOnePostQuery,
  useGetPostsQuery,
  useGetErrorProneQuery,
} from './../services/post'
import {
  useSignupMutation,
} from '../services/user'
// import './PostsManager.css'

export const AddPost = () => {
  const navigate = new useNavigate()
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
    // console.log('file', target.files);
    setImage(target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newPost = new FormData();    
    newPost.append("image", image);
    newPost.append("post", JSON.stringify(post));

    await addPost(newPost)
    setPost(initialValue)
    navigate("/homepage")

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

export const ModifyPost = (params) => {
  const navigate = new useNavigate()
  let { postId } = useParams();
  const [isPostDataSet, setIsPostDataSet] = useState(false)
  const { data: postData, isLoading } = useGetOnePostQuery(postId);
  const [image, setImage] = useState();
  const [post, setPost] = useState({ title: '', content: '' })
  
  const [modifyPost, { isLoadingModifyPost }] = useModifyPostMutation()

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
    newPost.append("image", image);
    newPost.append("post", JSON.stringify(post));

    console.log('postId', postId);
    await modifyPost({ body: newPost, id: postId })
    //setPost(initialValue)
    navigate("/homepage")

  }

  useEffect(() => {
    if (!isLoading && !isPostDataSet) {
      setIsPostDataSet(true);
      setPost(postData);
    }
  });

  if (isLoading || !post) {
    return <div>Loading...</div>
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
          {isLoading ? 'Adding...' : 'Update'}
        </button>
      </form>
    </LoggedIn>
  )
}

export const GetOnePost = (params) => {
  let { getOnePostId } = useParams();
  console.log('getOnePostId', getOnePostId);
  return (
    <h1>Données d'un post</h1>
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

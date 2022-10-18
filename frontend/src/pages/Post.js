import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import LoggedIn from "../layouts/LoggedIn";
import {
  useAddPostMutation,
  useModifyPostMutation,
  useGetOnePostQuery,
} from './../services/post';

export const PostManager = (props) => {
  const navigate = new useNavigate();
  const initialValue = { title: '', content: '' };
  const [isPostDataSet, setIsPostDataSet] = useState(false);
  let { postId } = useParams();
  const { data: postData, isLoading } = useGetOnePostQuery(postId);
  const [image, setImage] = useState();
  const [post, setPost] = useState(initialValue);
  const [addPost, { isLoadingAddPost }] = useAddPostMutation();
  const [modifyPost, { isLoadingModifyPost }] = useModifyPostMutation();

  useEffect(() => {
    if (!isLoading && !isPostDataSet && props.action === 'modify') {
      setIsPostDataSet(true);
      setPost(postData);
    }
  });
    
  if (props.action === 'modify' && (isLoading || !post)) {
    return <div>Loading...</div>
  }

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

    // console.log('postId', postId);
    if (props.action === 'add') {
      await addPost(newPost)
      setPost(initialValue)
    } else if (props.action === 'modify') {
      await modifyPost({ body: newPost, id: postId })
    }

    navigate("/homepage")
  }
  
  return (
    <LoggedIn>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="mb-3">
            <h1>Ajoutez un nouveau post</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                className="form-control"
                name="title"
                placeholder="Titre"
                type="text"
                onChange={handleChange}
                value={post.title}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                name="content" 
                placeholder="Contenu"
                onChange={handleChange}
                value={post.content}
              >
            </textarea>
            </div>
            <div className="mb-3">
              <input className="form-control" type="file" name="image" onChange={handleChangeImage}></input>
            </div>
            <button className="btn btn-primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Ajouter'}
            </button>
          </form>
        </div>
      </div>
    </LoggedIn>
  )
}

export const AddPost = () => {
  return (
    <PostManager action='add' />
  )
}

export const ModifyPost = () => {
  return (
    <PostManager action='modify' />
  )
}

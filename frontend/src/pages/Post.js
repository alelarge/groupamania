import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoggedIn from "../layouts/LoggedIn";
import {
  useAddPostMutation,
  useModifyPostMutation,
  useGetOnePostQuery,
} from './../services/post';
import { useForm } from "react-hook-form";

export const PostManager = (props) => {
  const navigate = new useNavigate();
  const initialValue = { title: '', content: '' };
  const [isPostDataSet, setIsPostDataSet] = useState(false);
  let { postId } = useParams();
  const { data: postData, isLoading } = useGetOnePostQuery(postId);
  const [addPost, { isLoadingAddPost }] = useAddPostMutation();
  const [modifyPost, { isLoadingModifyPost }] = useModifyPostMutation();
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    defaultValues: initialValue
  });

  useEffect(() => {
    if (!isLoading && !isPostDataSet && props.action === 'modify') {
      setIsPostDataSet(true);
      reset(postData);
    }
  });
    
  if (props.action === 'modify' && (isLoading || !postData)) {
    return <div>Loading...</div>
  }

  const onSubmit = async (data) => {
    const newPost = new FormData();    
    newPost.append("image", data.image[0]);
    newPost.append("post", JSON.stringify({ content: data.content, title: data.title }));

    if (props.action === 'add') {
      await addPost(newPost)
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
            {props.action === 'modify' &&
              <h1>Modifier un nouveau post</h1>
            }
            {props.action === 'add' &&
              <h1>Ajouter un nouveau post</h1>
            }
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                className="form-control"
                name="title"
                placeholder="Titre"
                type="text"
                {...register("title", { required: true })}
              />
              {errors.title && <span className="invalid-input">Ce champ est requis</span>}
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                name="content" 
                placeholder="Contenu"
                {...register("content", {required: true})}
              >
              </textarea>
              {errors.content && <span className="invalid-input">Ce champ est requis</span>}
            </div>
            <div className="mb-3">
              <input 
                className="form-control" 
                type="file" 
                name="image" 
                {...register("image", {required: true})}
              ></input>
              {errors.image && <span className="invalid-input">Ce champ est requis</span>}
            </div>
            <button className="btn btn-primary" type="submit" disabled={isLoading}>
              Valider
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

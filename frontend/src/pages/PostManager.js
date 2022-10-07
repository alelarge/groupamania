import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import LoggedIn from "../layouts/LoggedIn";
import {
    useAddPostMutation,
    useModifyPostMutation,
    useGetOnePostQuery,
    //   useGetPostsQuery,
    //   useGetErrorProneQuery,
} from '../services/post'
import {
    useSignupMutation,
} from '../services/user'

function PostManager(props) {
    const addpost = props.addpost;
    const modifypost = props.modifypost;
    const navigate = new useNavigate()
    const initialValue = { title: '', content: '' }
    const [image, setImage] = useState();
    const [post, setPost] = useState(initialValue)
    const [addPost, { isLoadingAddPost }] = useAddPostMutation()
    let { postId } = useParams();
    const [isPostDataSet, setIsPostDataSet] = useState(false)
    const { data: postData, isLoadingPostData } = useGetOnePostQuery(postId);
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
        if (!isLoadingPostData && !isPostDataSet) {
            setIsPostDataSet(true);
            setPost(postData);
        }
    });

    if (isLoadingPostData || !post) {
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
                <button type="submit" disabled={isLoadingPostData}>
                    {isLoadingPostData ? 'Adding...' : 'Update'}
                </button>
            </form>
        </LoggedIn>
    )
}

export default PostManager;

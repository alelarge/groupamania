import { useState } from "react";
import { useSelector } from 'react-redux';
import NotConnected from "../layouts/NotConnected";
import { Navigate, useNavigate } from 'react-router-dom';
import {
    useDeletePostMutation,
    useLikePostMutation,
    useUnlikePostMutation,
} from './../services/post'
import  PropTypes from 'prop-types';
// import { useFetch } from '../utils/hooks'

function Post(props) {
    const [post, updatePost] = useState("");
    const navigate= useNavigate();
    const auth = useSelector((state) => state.auth);
    const [deletePost, { isLoadingDeletePost }] = useDeletePostMutation()
    const [likePost, { isLoadingLikePost }] = useLikePostMutation()
    const [unlikePost, { isLoadingUnlikePost }] = useUnlikePostMutation()
    console.log('auth', auth);
    console.log('props.data.usersliked', props.data.usersliked);
    console.log('props.data.id_user', props.data.id_user);

    const modifyPost = () => {        
        navigate(`/post/${props.data.id}/modify`);
    }

    const handleDeletePost = async () => {        
        await deletePost(props.data.id);
    }

    const handleUnlikePost = async () => {        
        await unlikePost(props.data.id);

        console.log('unlike');
    }

    const handlelikePost = async () => {        
        await likePost(props.data.id);
    }
    console.log('auth', auth);

    return (
        <div className="Post">
            {/* 

            } */}
            <h1>{props.data.title}</h1>
            <h2>{props.data.content}</h2>
            <img src={`${process.env.REACT_APP_API_BASE_URL}${props.data.image_url}`} />
            <p>{props.data.likes}</p>
            {props.data.usersliked.includes(auth.userId) &&
                <button onClick={handleUnlikePost}>Unlike</button>
            }
            {!props.data.usersliked.includes(auth.userId) &&
                <button onClick={handlelikePost}>Like</button>
            }
            {(props.data.id_user === auth.userId || auth.isAdmin) &&
                <>
                    <button onClick={modifyPost}>Modifier</button>
                    <button onClick={handleDeletePost}>Supprimer</button>
                </>
            }
            <hr />
        </div>
    );
}
Post.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    img : PropTypes.string,
    likes : PropTypes.number,
}

export default Post;





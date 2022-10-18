import { useState } from "react";
import { useSelector } from 'react-redux';
import NotConnected from "../layouts/NotConnected";
import { Navigate, useNavigate } from 'react-router-dom';
import {
    useDeletePostMutation,
    useLikePostMutation,
    useUnlikePostMutation,
} from './../services/post'
import PropTypes from 'prop-types';
import { format, formatDistance, parseISO, formatRelative, subDays } from 'date-fns'
import { fr } from 'date-fns/locale'


function Post(props) {
    const [post, updatePost] = useState("");
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const [deletePost, { isLoadingDeletePost }] = useDeletePostMutation()
    const [likePost, { isLoadingLikePost }] = useLikePostMutation()
    const [unlikePost, { isLoadingUnlikePost }] = useUnlikePostMutation()
    // console.log('auth', auth);
    // console.log('props.data.usersliked', props.data.usersliked);
    // console.log('props.data.id_user', props.data.id_user);

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
    console.log('props', props);

    return (
        <div className="Post mb-3">
            <div className="card">
                <img src={`${process.env.REACT_APP_API_BASE_URL}${props.data.image_url}`} className="card-img-top" />
                <div className="card-body">
                    <div className="d-flex mb-3">
                        <h1 className="card-title me-auto p-2">{props.data.title}</h1>
                        <div className="d-flex align-items-start mb-3 p-2">
                            {props.data.usersliked.includes(auth.userId) &&
                                <i onClick={handleUnlikePost} className="bi bi-hand-thumbs-up-fill fs-4" role="button"></i>
                            }
                            {!props.data.usersliked.includes(auth.userId) &&
                                <i onClick={handlelikePost} className="bi bi-hand-thumbs-up fs-4" role="button"></i>
                            }
                            <p className="card-text fs-4">{props.data.likes}</p>
                        </div>
                    </div>

                    <p>{formatDistance(parseISO(props.data.created_on), new Date(), { addSuffix: true, locale: fr })}</p>
                    <h2 className="card-title fs-4 fw-normal mb-3">{props.data.content}</h2>
                    <div className="d-grid gap-2">
                        {(props.data.id_user === auth.userId || auth.isAdmin) &&
                            <>
                                <button className="btn btn-primary" onClick={modifyPost}>Modifier</button>
                                <button className="btn btn-primary" onClick={handleDeletePost}>Supprimer</button>
                            </>
                        }
                        <hr />
                    </div>
                </div>
            </div>
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





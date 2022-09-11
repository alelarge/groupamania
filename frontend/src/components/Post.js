import { useState } from "react";
import NotConnected from "../layouts/NotConnected";
// import { useFetch } from '../utils/hooks'

function Post(props) {
    console.log('props', props);
    const [post, updatePost] = useState("");
    const [likePost, updateLikepost] = useState("");

    return (
        <div className="Post">
            <h1>{props.data.title}</h1>
            <h2>{props.data.content}</h2>
            <img src={`${process.env.REACT_APP_API_BASE_URL}${props.data.image_url}`} />
            <p>{props.data.likes}</p>
        </div>
    );
}

export default Post;





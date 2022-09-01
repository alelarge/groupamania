import { useState } from "react";
import NotConnected from "../layouts/NotConnected";
// import { useFetch } from '../utils/hooks'

function Post(props) {
    const [post, updatePost] = useState("");
    const [likePost, updateLikepost] = useState("");

    return (
        <div className="Post">
            <h1>{props.title}</h1>
        </div>
    );
}

export default Post;


    // dispatch(
    //   login({
    //     token: response.data.token,
    //     userId: response.data.userId,
    //     email: email,
    //   })
    // );

    //     // Redirect user to homepage
    //     navigate("/homepage");
    //   })




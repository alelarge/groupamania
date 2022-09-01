import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
import LoggedIn from "../layouts/LoggedIn";
import Post from "../components/Post";
import {
    useGetPostsMutation,
  } from '../services/post'


function Homepage() {
    const posts = useSelector((state) => state.posts);
    //const [posts, updatePost] = useState([]);
    const [getPosts, { isSuccess }] = useGetPostsMutation();
    useEffect(() => {
        getPosts();
        if (isSuccess) {
            console.log('isSuccess', posts)
        
        }
    }, []);

    useEffect(() => {
        console.log('posts', posts)
    });

    return (
        <LoggedIn>
            {/* <div className="Login"> */}
            <div className="Homepage">
                <h1>Hello Homepage</h1>
                <section className="Homepage__postList">
                    {posts}
                </section>
            </div>
        </LoggedIn>
    );
}

export default Homepage;


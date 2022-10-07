import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
import LoggedIn from "../layouts/LoggedIn";
import Post from "../components/Post";
import {
    useGetPostsMutation,
    useGetPostsQuery,
  } from '../services/post'


function Homepage() {
    const { data: posts, isLoading } = useGetPostsQuery();

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <LoggedIn>
            {/* <div className="Login"> */}
            <div className="Homepage">
                <h1>Hello Homepage</h1>
                <section className="Homepage__postList">
                    {posts.map((post) => (
                        <Post data={post} key={post.id}></Post>
                    ))}
                </section>
            </div>
        </LoggedIn>
    );
}

export default Homepage;


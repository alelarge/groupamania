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
            <div className="Homepage">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="mb-3">
                        <h1>Hello Homepage</h1>
                        </div>
                        <section className="Homepage__postList">
                            {posts.map((post) => (
                                <Post data={post} key={post.id}></Post>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </LoggedIn>
    );
}

export default Homepage;


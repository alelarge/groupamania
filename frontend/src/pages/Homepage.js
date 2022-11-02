import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import LoggedIn from "../layouts/LoggedIn";
import Post from "../components/Post";
import {
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
                            <h1>Fil d'actualité</h1>
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


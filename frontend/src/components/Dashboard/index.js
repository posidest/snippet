import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import palette from '../../images/palette.jpg'
import './Dashboard.css';
import { showPosts } from '../../store/posts'
import { likeAPost } from '../../store/likes'

const Dashboard = () => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    useEffect(() => {
        dispatch(showPosts())
    }, [dispatch])

    const posts = useSelector(state => state.post.posts);

    // const likePost = (e) => {
    //     dispatch(likeAPost(sessionUser.id, e.target.id))
    // }


    if (posts) {
        return (
            <div className='dash'>
                {posts.map(post => (
                    <div className='center' key={post.id}>
                        <img src={post.User.avatar || palette} alt='avatar' className='avatar' />
                        <div className='content-div'>
                            <div className='blog-info'>
                                <a href={`/${post.Blog}`}>{post.User.blogName}</a>
                                <i className='fas fa-sync-alt fa-lg' />
                                <a href='https://mentaltimetraveller.tumblr.com/'>mental time traveller</a>
                            </div>
                            {post.type === 'image' && <img src={post.content} alt='picture' className='dash-img' />}
                            {post.type === 'words' && <p>{post.content}</p>}
                            {post.type === 'link' && <a href={post.content}>{post.content}</a>}
                            <p>{post.caption}</p>
                            <a href='/posts/id/likes' className='likes'>{post.Likes.length} likes</a>
                            <div className='dash-btns'><i className="fas fa-heart fa-lg" onClick={() => dispatch(likeAPost({ userId: sessionUser.id, postId: post.id }))} />< i className="fas fa-sync-alt fa-lg" /></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Dashboard Loading...</h1>
            </div>
        )
    }
}

export default Dashboard;
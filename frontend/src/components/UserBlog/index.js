import React, { useState, userEffect, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { populateBlog } from '../../store/posts'
import { findAUser } from '../../store/users'

const UserBlog = () => {
    const dispatch = useDispatch();
    const { blogName } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    console.log(blogName);

    useEffect(() => {
        const user = dispatch(findAUser({ blogName: blogName })).then(() => {
            dispatch(populateBlog({ userId: user.id }))
        })
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(populateBlog({ userId: sessionUser.id }))
    // }, [dispatch])
    const blogOwner = useSelector((state) => state.user.user)
    const blogPosts = useSelector((state) => state.post.blogPosts);
    console.log(blogPosts, 'blog posts')

    if (blogPosts) {
        return (
            <div className='blog'>
                <h1>{blogName}</h1>
                {blogPosts.map((post) => (
                    <div key={post.id}>
                        {post.type === 'image' && <img src={post.content} alt='image' />}
                        {post.type === 'words' && <p>{post.content}</p>}
                        {post.type === 'link' && <a href={post.content}>{post.content}</a>}
                        <p>{post.caption}</p>
                    </div>
                ))}
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Blog Loading...</h1>
            </div>
        )
    }


}


export default UserBlog;
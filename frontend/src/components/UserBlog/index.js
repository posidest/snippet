import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { populateBlog } from '../../store/post'
import { findAUser } from '../../store/user'
import PostButton from '../Menus/PostButton';
import palette from '../../images/palette.jpg';
import './UserBlog.css'

const UserBlog = ({isBlog, setIsBlog}) => {
    const dispatch = useDispatch();
    const { blogName } = useParams();
    console.log(blogName);
    

    const parseDate = (timestamp) => {
        let mos = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let res = timestamp.slice(0, timestamp.indexOf('T'));
        res = res.split('-')
        let arr = [res[1], res[2] += ', ', res[0]]
        let month = mos[Number(arr[0]) - 1];
        arr.shift()
        arr.unshift(month)
        res = arr.join(' ')
        return res;
    }


    const sessionUser = useSelector((state) => state.session.user);
    let user = useSelector((state) => state.user.user);
    if(user) user = user['user']
    let blogPosts = useSelector((state) => state.post.blogPosts);


    useEffect(() => {
        dispatch(findAUser({ blogName: blogName }))           
    }, [dispatch])

    useEffect(() => {
        if (user) {
            dispatch(populateBlog({userId: user.id}))
            setIsBlog(true)
        }
    }, [dispatch, user])


    if (blogPosts) {
        return (
            <div className='blog'>
                <div className='owner-info'>
                    <img src={user.avatar || palette} alt='avatar'/>
                    <h3>{blogName}</h3>
                </div>
                {blogPosts.map((post) => (
                    <div className='post' key={post.id}>
                        {post.type === 'image' && (
                        <div className='image-post'>
                            <img src={post.content} alt='image' style={{maxWidth: '400px', maxHeight: '400px'}}/>
                        </div>
                        )}
                        {post.type === 'words' && (
                        <div className='word-post'>
                            <p style={{color: 'black'}}>{post.content}</p>
                            </div>)}
                        {post.type === 'link' && (
                        <div className='link-post'>
                            <a href={post.content}>{post.content}</a>
                        </div>)}
                        <div className='caption-div'>
                            <p>
                                {post.caption}
                            </p>
                        </div>
                        <div className='underline'>            
                        </div>
                        <div className='post-foot'>
                            <i className='fas fa-sync-alt' />
                            <i className='fas fa-heart' />
                            <span className='date'>{parseDate(post.createdAt)}</span>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    else {
        return (  
            <div>
                <h1>Blog Loading...</h1>-
            </div>
        )
    }


}


export default UserBlog;
import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { populateBlog } from '../../store/post'
import { findAUser } from '../../store/user'
import PostButton from '../Menus/PostButton';
import BlogPost from './BlogPost'
import { likeAPost, showLikes, unLikePost } from '../../store/likes'
import { followBlog, showFollows, unFollowBlog } from '../../store/follows'
import palette from '../../images/palette.jpg';
import './UserBlog.css'

const UserBlog = () => {
    const [following, setFollowing] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch();
    const { blogName } = useParams();
    const userLikes = useSelector(state => state.likes.userLikes)
    const userFollows = useSelector(state => state.follows.following)
    const sessionUser = useSelector((state) => state.session.user);
    let user = useSelector((state) => state.user.user);
    let blogPosts = useSelector((state) => state.post.blogPosts);
    let blogId;

    if(!sessionUser) {
        history.push('/')
    }

    if(user) {
        blogId = user.Blog.id;
    }
    let followed, liked = [];
        
    if (userFollows) {
         followed = userFollows.map(follow => follow.blogId);
    }
    if (userLikes) {
        liked = userLikes.map(like => like.postId);
    }
    
    useEffect(() => {
        dispatch(findAUser({ blogName: blogName }))
        .then(() => dispatch(showFollows()))
        .then(() => dispatch(showLikes()))         
    }, [dispatch])
    
    useEffect(() => {
        if (user) {
            dispatch(populateBlog({userId: user.id}))
        }
    }, [dispatch, user])
    
        const follow = (e) => {
         // !following ?
         !followed.includes(blogId) ?
         dispatch(followBlog({
            userId: sessionUser.id,
            blogId: blogId
         })).then(() => {
             followed.push(blogId) 
             dispatch(showFollows())
             setFollowing(true)
         }) :
         dispatch(unFollowBlog(blogId))
         .then(() => {
             followed = followed.filter((follow) => follow !== blogId)
             dispatch(showFollows())
             setFollowing(false)
         })
      }

    

    if (blogPosts && user && followed) {
        return (
            <div className='blog'>
                <div className='owner-info'>
                    <img src={user.avatar || palette} alt='avatar'/>
                    <h3>{blogName}</h3>
                    {!following && (
                        <button type='button' 
                        onClick={follow}>
                            Follow
                        </button>)}
                     {following && (
                        <button type='button' 
                        onClick={follow}>
                            Unfollow
                        </button>)}
                </div>
                {blogPosts.map((post) => (
                    <BlogPost post={post} followed={followed} liked={liked} user={user}/>
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
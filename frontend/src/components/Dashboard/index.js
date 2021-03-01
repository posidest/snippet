import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import palette from '../../images/palette.jpg'
import './Dashboard.css';
import { showPosts } from '../../store/posts'
import { likeAPost, showLikes, unLikePost } from '../../store/likes'
import { followBlog, showFollows, unFollowBlog } from '../../store/follows'


const Dashboard = () => {

    const [likes, setLikes] = useState([])
    const [follows, setFollows] = useState([]);

    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const posts = useSelector(state => state.post.posts);
    const userLikes = useSelector(state => state.likes.userLikes)
    const userFollows = useSelector(state => state.follows.userFollows)


    useEffect(() => {
        dispatch(showPosts())
            .then(() => dispatch(showFollows()))
            .then(() => dispatch(showLikes()))
    }, [dispatch])


    // useEffect(() => {
    //     if (posts && userLikes && userFollows) {
    //         const followed = userFollows.map(follow => Number(follow.blogId));
    //         const liked = userLikes.map(like => Number(like.postId));
    //         setFollows(followed);
    //         setLikes(liked);
    //     }
    // else return;
    // }, [userLikes, userFollows, dispatch])


    if (!sessionUser) {
        return <Redirect to='/' />
    }

    if (posts && userLikes && userFollows) {

        const followed = userFollows.map(follow => follow.blogId);
        const liked = userLikes.map(like => like.postId);

        return (
            <div className='dash'>
                <img src={sessionUser.avatar || palette} className='user-avatar' />
                <div className='post-div'>
                    <div className='post-buttons'>
                        <NavLink to='/new/image'>
                            <i className='fas fa-camera-retro fa-2x'
                                style={{ color: 'red' }} />
                            <p>Image</p>
                        </NavLink>
                        <NavLink to='/new/words'>
                            <i className='fas fa-font fa-2x'
                                style={{ color: 'DeepSkyBlue' }} />
                            <p>Words</p>
                        </NavLink>
                        <NavLink to='/new/link'>
                            <i className='fas fa-link fa-2x'
                                style={{ color: 'green' }} />
                            <p>Link</p>
                        </NavLink>
                    </div>
                </div>
                {posts.map((post) => (
                    <div className='dash'
                        key={post.id}>
                        <img src={post.User.avatar || palette}
                            alt='avatar'
                            className='avatar' />
                        <div className='content-div'>
                            <div className='blog-info'>
                                <a href='/blog'>
                                    {post.User.blogName}
                                </a>
                                <p className='follow'
                                    style={followed.includes(post.Blogs.id) ?
                                        { color: 'gray' } :
                                        {
                                            color: 'DeepSkyBlue',
                                            fontWeight: 'bold',
                                            fontSize: '11px',
                                            cursor: 'pointer'
                                        }}
                                    value={post.Blogs.id}
                                    onClick={() => !followed.includes(post.Blogs.id) ?
                                        dispatch(followBlog({
                                            userId: sessionUser.id,
                                            blogId: post.Blogs[0].id
                                        })) :
                                        dispatch(unFollowBlog({
                                            userId: sessionUser.id,
                                            blogId: post.Blogs[0].id
                                        }))}
                                >Follow</p>
                            </div>
                            <div className='underline'>
                            </div>
                            {post.type === 'image' &&
                                <img src={post.content}
                                    alt='picture'
                                    className='dash-img' />}
                            {post.type === 'words' && <p>{post.content}</p>}
                            {post.type === 'link' &&
                                <a href={post.content}>
                                    {post.content}
                                </a>}
                            <p>{post.caption}</p>
                            <div className='underline'>
                            </div>
                            <div className='dash-btns'>
                                <i className="fas fa-heart fa-lg"
                                    value={post.id}
                                    onClick={() => !liked.includes(post.id) ?
                                        dispatch(likeAPost({
                                            userId: sessionUser.id,
                                            postId: post.id
                                        })) :
                                        dispatch(unLikePost({
                                            userId: sessionUser.id,
                                            postId: post.id
                                        }))}
                                    style={liked.includes(post.id) ? { color: 'red' } : { color: 'none' }}
                                />
                                < i className="fas fa-sync-alt fa-lg" />
                            </div>
                            <a href='/posts/id/likes' className='likes'>{post.Likes.length} likes</a>
                        </div>
                    </div>
                ))
                }
            </div >
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
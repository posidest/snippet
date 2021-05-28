import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, Link } from 'react-router-dom';
import palette from '../../images/palette.jpg'
import './Dashboard.css';
import { showPosts } from '../../store/post'
import { showLikes } from '../../store/likes'
import { showFollows } from '../../store/follows'
import { discoverUsers } from '../../store/user'
import Post from './Post'

const Dashboard = () => {

    const [loaded,setLoaded] = useState(false);
    const dispatch = useDispatch();
    let followed, liked = [];
    const sessionUser = useSelector(state => state.session.user);
    const userLikes = useSelector(state => state.likes.userLikes);
    const userFollows = useSelector(state => state.follows.following);
    const posts = useSelector(state => state.post.postData);
    const users = useSelector(state => state.user.users);

    if (users) {
        console.log(users[0].blogName, 'users from dashboard')
    }
    if (userFollows) {
        followed = userFollows.map(follow => follow.blogId);
    }
    if (userLikes) {
        liked = userLikes.map(like => like.postId);
    }

    useEffect(() => {
        dispatch(showPosts())
            .then(() => dispatch(showFollows()))
            .then(() => dispatch(showLikes()))
            .then(() => dispatch(discoverUsers()))
            .then(() => setLoaded(true))
        }, [dispatch])

    if (!sessionUser) {
        return <Redirect to='/' />
    }

     if (posts && userFollows && userLikes && users) { 
        return (
            <div className='dash-page'>
                <div className='discover'>
                    <h3 style={{color: 'white'}}>Check out these blogs</h3>
                    {users.map((user) => (
                        <div className='discover-profile'>
                            <Link to={`/${user.blogName}`} style={{color: 'white'}}>
                                <div className='discover-img'>
                                    <img src={user.avatar || palette} 
                                    style={{maxHeight: '70px', maxWidth: '70px'}}/>
                                </div>
                                {user.blogName}
                            </Link>
                        </div>
                    ))}
                </div>  
                <div className='dash'>
                    <img src={sessionUser.avatar || palette}
                        className='user-avatar' />
                    <div className='post-div'>
                        <div className='post-buttons'>
                            <NavLink to='/new/image'>
                                <i className='fas fa-camera-retro fa-2x'
                                    style={{color: 'red'}} />
                                <p>Image</p>
                            </NavLink>
                            <NavLink to='/new/words'>
                                <i className='fas fa-font fa-2x'
                                    style={{color: 'deepskyblue'}} />
                                <p>Words</p>
                            </NavLink>
                            <NavLink to='/new/link'>
                                <i className='fas fa-link fa-2x'
                                    style={{color: 'green'}} />
                                <p>Link</p>
                            </NavLink>
                        </div>
                    </div>  
                    {posts.map((post) => (
                        <Post 
                        post={post} 
                        followed={followed} 
                        liked={liked}
                        key={post.id}
                        /> 
                    ))
                    }
                </div >
            </div>
            )
        } else {
            return (
                <div>
                    <h1 style={{ color: 'black' }}>
                        Dashboard Loading...
                    </h1>
                </div>
            )
        }
    }

export default Dashboard;
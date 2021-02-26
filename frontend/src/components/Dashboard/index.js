import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import pic1 from '../../images/5.jpg'
// import pic2 from '../../images/20.jpg'
// import pic3 from '../../images/14.jpg'
// import pic4 from '../../images/8.jpg'
// import pic5 from '../../images/40.jpg'
// import pic6 from '../../images/37.jpg'
// import pic7 from '../../images/32.jpg'
// import pic8 from '../../images/21.jpg'
// import pic9 from '../../images/27.jpg'
// import pic10 from '../../images/4.jpg'
// import pic11 from '../../images/9.jpg'
// import pic12 from '../../images/12.jpg'
// import avatar from '../../images/face.jpg'
import './Dashboard.css';
import { showPosts } from '../../store/posts'


const Dashboard = () => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    useEffect(() => {
        dispatch(showPosts())
    }, [dispatch])

    const posts = useSelector(state => state.post.posts);


    if (posts) {
        return (
            <div className='dash'>
                {posts.map(post => (
                    <div className='center' key={post.id}>
                        <img src={post.User.avatar} alt='avatar' className='avatar' />
                        <div className='content-div'>
                            <div className='blog-info'>
                                <a href='https://meow-zah.tumblr.com/'>quixotics</a>
                                <i className='fas fa-sync-alt fa-lg' />
                                <a href='https://mentaltimetraveller.tumblr.com/'>mental time traveller</a>
                            </div>
                            {post.type === 'image' && <img src={post.content} alt='picture' className='dash-img' />}
                            {post.type === 'words' && <p>{post.content}</p>}
                            {post.type === 'link' && <a href={post.content}>{post.content}</a>}
                            <p>{post.caption}</p>
                            <a href='blah.com' className='likes'>578478 likes</a>
                            <div className='dash-btns'><i className="fas fa-heart fa-lg" />< i className="fas fa-sync-alt fa-lg" /></div>
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
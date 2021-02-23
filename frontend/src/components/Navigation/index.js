import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import PostButton from './PostButton';
import './Navigation.css'


const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div>
                <ProfileButton user={sessionUser} />
                <PostButton />
            </div>
        );
    } else {
        sessionLinks = (
            <div className='session'>
                <div className='login-btn'>
                    <NavLink to='/login'>Login</NavLink>
                </div>
                <div className='signup-btn'>
                    <NavLink to='/signup'>Sign Up</NavLink>
                </div>
            </div>
        );
    }

    return (
        <div className='nav'>
            <div>
                <NavLink exact to='/'><i className="fas fa-cut fa-lg" /></NavLink>
            </div>
            {isLoaded && sessionLinks}
        </div>
    );
}




export default Navigation;
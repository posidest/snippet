import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import ProfileButton from '../Menus/ProfileButton';
import PostButton from '../Menus/PostButton';
import './Navigation.css'

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <div>
                    <NavLink exact to='/dashboard'><i className="fas fa-cut fa-2x" /></NavLink>
                </div>
                <div className='user-btns'>
                    <ProfileButton user={sessionUser} />
                    <PostButton />
                </div>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <div>
                    <NavLink exact to='/'><i className="fas fa-cut fa-2x" /></NavLink>
                </div>
                <div className='session'>
                    <div className='login-btn'>
                        <NavLink to='/login'>Login</NavLink>
                    </div>
                    <div className='signup-btn'>
                        <NavLink to='/signup'>Sign Up</NavLink>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className='nav'>
            {isLoaded && sessionLinks}
        </div>
    );
}



export default Navigation;
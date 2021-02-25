import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <div onClick={openMenu} className='icon'>
                < i className="fas fa-user fa-lg" />
            </div>
            {showMenu && (
                <div className="profile-dropdown">
                    <div className='profile-head'>
                        <p>
                            Account
                        <span onClick={logout}> Log out</span>
                        </p>
                    </div>
                    <ul>
                        <li>
                            <i className='fas fa-heart' />
                            <NavLink to='/likes'>Likes </NavLink>
                        </li>
                        <li>
                            <NavLink to='/following'>Following</NavLink>
                        </li>
                        <li>{user.blogName}</li>
                        <li>{user.email}</li>
                    </ul>
                    {/* <li>
                        <button onClick={logout}>Log Out</button>
                    </li> */}
                </div>
            )}
        </>
    );
}

export default ProfileButton;
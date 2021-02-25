import React from 'react';
import { useState, useEffect } from "react";
// import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
// import { usePostType } from '../../context/PostContext'
import './Navigation.css'

const PostButton = () => {
    const [showMenu, setShowMenu] = useState(false);
    // const [type, setType] = useState('image')
    const menuItems = [
        { to: '/new/image', copy: 'Image' },
        { to: '/new/words', copy: 'Words' },
        { to: '/new/link', copy: 'Link' }
    ];

    const history = useHistory();
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


    return (
        <>
            <div onClick={openMenu} className='post-btn'>
                <i className="fas fa-palette fa-lg" />
            </div>
            {showMenu && (
                <ul className="post-dropdown">
                    {menuItems.map(({ to, copy }) => (
                        <li key={copy}>
                            <NavLink to={to}>
                                {copy}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}

        </>

    )
}

export default PostButton;
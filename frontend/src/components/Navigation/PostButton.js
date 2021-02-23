import React, { useState, useEffect } from "react";
// import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { usePostType } from '../../context/PostContext'
import './Navigation.css'

const PostButton = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [type, setType] = useState('image')
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
            <button onClick={openMenu} className='post-btn'>
                <i className="fas fa-palette fa-lg" />
            </button>
            {showMenu && (
                <ul className="post-dropdown">
                    <li>
                        <NavLink to='/new/image'>Image</NavLink>
                    </li>
                    <li><NavLink to='/new/words'>Words</NavLink></li>
                    <li><NavLink to='/new/link'>Link</NavLink></li>
                </ul>
            )}

        </>

    )
}

export default PostButton;
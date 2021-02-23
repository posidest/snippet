import React, { useState, useEffect } from "react";
// import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { usePostType } from '../../context/PostContext'

const PostButton = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { type, setType } = usePostType()

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
                        <NavLink to='/new/image' onClick={() => setType('image')}>Image</NavLink>
                    </li>
                    <li><NavLink to='/new/words' onClick={() => setType('words')}>Words</NavLink></li>
                    <li><NavLink to='/new/link' onClick={() => setType('link')}>Link</NavLink></li>
                </ul>
            )}

        </>

    )
}

export default PostButton;
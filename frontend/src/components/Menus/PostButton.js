import React from 'react';
import { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import './DropDown.css'


const PostButton = () => {
    const [showMenu, setShowMenu] = useState(false);

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
                <i className="fas fa-palette fa-lg" style={{ color: 'deepskyblue' }} />
            </div>
            {showMenu && (
                <div className='drop-down-post'>
                    <ul>
                        <li>
                            <NavLink to='/new/image'>
                                Image
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/new/words'>
                                Words
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/new/link'>
                                Link
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )
            }

        </>

    )
}

export default PostButton;
import React from 'react';
import { NavLink } from 'react-router-dom';

const PostButtons = () => {
    return (
        <div className='drop-down'>
            <div className='post-page-buttons'>
                <ul>
                    <li>
                        <NavLink to='/new/image'>
                            <i className='fas fa-camera-retro fa-lg'
                                style={{ color: 'red' }} />
                            <p>Image</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/new/words'>
                            <i className='fas fa-font fa-lg'
                                style={{ color: 'DeepSkyBlue' }} />
                            <p>Words</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/new/link'>
                            <i className='fas fa-link fa-lg'
                                style={{ color: 'green' }} />
                            <p>Link</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}


export default PostButtons;
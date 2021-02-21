import React from 'react';
import { NavLink } from 'react-router-dom';
import './LandingPage.css'

const LandingPage = () => {
    return (
        <>
            <div className='first-view'>
                <h1 class='logo'>snippet</h1>
                <h2>Make stuff, look at stuff, get inspired.</h2>
                <div className='signup'>
                    <NavLink to='/signup'>Get Started</NavLink>
                </div>
                <div className='login'>
                    <NavLink to='/login'>Log in</NavLink>
                </div>
            </div>
            <div className='second-view'>
                <h4>What is Snippet?</h4>
                {/* <span>
                    <i className='fas fa-cut' />
                </span> */}
                <h2>Snippet is the place to go when you seek inspiration.</h2>
                <p>
                    We made it really, really easy for artists to make a page and put whatever
                    they want on it. Photos, paintings, links, quotes, artist statements, ideas,
                    fashion imagery, color schemes, pattern inspiration, whatever inspires.
            </p>
            </div>
            <div className='third-view'>
                <h1>Snippet is a place to collect images.</h1>
                <p>Tired of bookmarking random sites for photo references and visual inspiration?
                Create a page where you can store all the images and words that make you tick.
                </p>
            </div>

        </ >
    )
}

export default LandingPage;
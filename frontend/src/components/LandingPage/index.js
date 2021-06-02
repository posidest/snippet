import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux'
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import './LandingPage.css';
import pic1 from '../../images/5.jpg';
import pic2 from '../../images/7.jpg';
import pic3 from '../../images/9.jpg';
import pic4 from '../../images/11.jpg';
import pic5 from '../../images/13.jpg';

let pics = [pic1, pic2, pic3, pic4, pic5];

const LandingPage = ({ isLoaded }) => {

    const sessionUser = useSelector(state => state.session.user);
    // if (sessionUser) <Redirect to='/dashboard' />
    const history = useHistory();
    if (sessionUser) history.push('/dashboard')


    return (
        <div className='landing'>
            <div className='first-view'>
                <div className='text'>
                    <h1 className='logo'>snippet</h1>
                    <h2>Make stuff, look at stuff, get inspired.</h2>
                    <div className='session-btns'>
                        <div className='signup'>
                            <NavLink to='/signup'>Get Started</NavLink>
                        </div>
                        <div className='login'>
                            <NavLink to='/login'>Log in</NavLink>
                        </div>
                    </div >
                </div>
            </div>
            <div className='second-view'>
                <h4 className='wotsit'>What is Snippet?</h4>
                <div className='text'>
                    <h1>Snippet is the place to go when you seek inspiration.</h1>
                    <p>We made it really, really easy for artists to make a page and put whatever
                    they want on it. Photos, paintings, links, quotes, artist statements, ideas,
                    fashion imagery, color schemes, pattern inspiration, whatever inspires.
                        </p>
                </div>
            </div>
            <div className='third-view'>
                <div className='text'>
                    <h1>Snippet is a place to collect images.</h1>
                    <p>Tired of bookmarking random sites for photo references and visual inspiration?
                    Create a page where you can store all the images and words that make you tick.
                        </p>
                    <div className='landing-pics'>
                        {pics.map((pic, idx) => (
                            <div className='pic' key={pic}>
                                <img src={pic} alt={idx} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LandingPage;
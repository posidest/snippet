import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import './LandingPage.css'
import Feed from '../Feed'
import Navigation from '../Navigation';
import pic1 from './LandingPics/2.jpg';
import pic2 from './LandingPics/4.jpg';
import pic3 from './LandingPics/6.jpg';
import pic4 from './LandingPics/8.jpg';
import pic5 from './LandingPics/10.jpg';
// import { useImports } from '../../context/ImportContext/Imports';
// import  as pics from './LandingPics'
// import * as pics from './LandingPics'


// const picPicker = () => {
//     let pics = [];
//     for (let i = 0; i < 5; i++) {
//         let pic = Math.floor(Math.random() * Math.floor(41));
//         pics.push(pic);
//     }
//     return pics;
// }

// picPicker();

// import pic1 from `./LandingPics/${pics[0]}.jpg`;
// import pic2 from `./LandingPics/${pics[1]}.jpg`;
// import pic3 from `./LandingPics/${pics[2]}.jpg`;
// import pic4 from `./LandingPics/${pics[3]}.jpg`;
// import pic5 from `./LandingPics/${pics[4]}.jpg`;




//         let statement = `import pic${i} from './LandingPics/`;
//         let num = Math.floor(Math.random() * Math.floor(41));


const LandingPage = ({ isLoaded }) => {


    // console.log(pics)
    // const [images, setImages] = useState([]);
    // useEffect(() => {
    //     const imgs = [];
    //     for (let i = 0; i < 5; i++) {
    //         // let pic = '../../images/'
    //         let num = Math.floor(Math.random() * Math.floor(41));
    //         // pic = pic + num + '.jpg';
    //         let pic = pics[num];
    //         // let pic = num + '.jpg'
    //         // console.log(pic)
    //         imgs.push(pic);
    //     }
    //     setImages(imgs)
    // }, [])


    // useEffect(() => {
    //     let imports = [];
    //     for (let i = 0; i < 5; i++) {
    //         let statement = `import pic${i} from './LandingPics/`;
    //         let num = Math.floor(Math.random() * Math.floor(41));
    //         statement = statement + num + `.jpg` + "'";
    //         imports.push(statement);
    //         console.log(statement)
    //     }
    //     return imports;
    // }, [])
    // const { imports } = useImports();

    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) {
        return (
            <>
                <div className='first-view'>
                    <h1 className='logo'>snippet</h1>
                    <h2>Make stuff, look at stuff, get inspired.</h2>
                    <div className='signup-btn'>
                        <NavLink to='/signup'>Get Started</NavLink>
                    </div>
                    <div className='login-btn'>
                        <NavLink to='/login'>Log in</NavLink>
                    </div>
                </div>
                <div className='second-view'>
                    <h4 className='wotsit'>What is Snippet?</h4>
                    <div className='text'>
                        <h1>Snippet is the place to go when you seek inspiration.</h1>
                        <p>
                            We made it really, really easy for artists to make a page and put whatever
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
                    </div>
                    <div className='landing-pics'>
                        {/* {imports.map((image, idx) => (
                            <>
                                <img src={image} alt={idx} />
                            </>
                        ))} */}
                        <img src={pic1} alt='one' />
                        <img src={pic2} alt='two' />
                        <img src={pic3} alt='three' />
                        <img src={pic4} alt='four' />
                        <img src={pic5} alt='five' />
                    </div>
                </div>
            </>
        )
    }
    else return (
        <Feed />
    )
}

export default LandingPage;
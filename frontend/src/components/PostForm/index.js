import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePostType } from '../../context/PostContext'

const PostForm = () => {

    const { type, setType, types } = usePostType();
    const [pic, setPic] = useState('');
    const [caption, setCaption] = useState('');
    const [words, setWords] = useState('');
    const [link, setLink] = useState('')


    const submitForm = (e) => {
        e.preventDefault();
        const picData = { pic, caption };
        console.log(picData);
        const wordsData = { words };
        console.log(wordsData);
        const linkData = { link, caption };
        console.log(linkData);
    }


    // const params = useParams();
    // console.log(params);

    let form;

    if (type === 'image') {
        form = (
            <div>
                <form onSubmit={submitForm}>
                    <input type='file' onChange={(e) => setPic(e.target.value)} value={pic} placeholder='upload a pic' />
                    <input type='text' onChange={(e) => setCaption(e.target.value)} value={caption} placeholder='add a caption' />
                    <button type='submit'> Submit</button>
                </form>
            </div >
        )
    }
    else if (type === 'words') {
        form = (
            <div>
                <form onSubmit={submitForm}>
                    <input type='text' onChange={(e) => setWords(e.target.value)} value={words} placeholder='write something' />
                    <button type='submit'> Submit</button>
                </form>
            </div >
        )
    }
    else {
        form = (
            <div>
                <form onSubmit={submitForm}>
                    <input type='file' onChange={(e) => setLink(e.target.value)} value={link} placeholder='share a link' />
                    <input type='url' onChange={(e) => setCaption(e.target.value)} value={caption} placeholder='add a caption' />
                    <button type='submit'> Submit</button>
                </form>
            </div >
        )
    }

    return (
        <div className='post-form'>
            {form}
        </div>
    )

    return (
        null
    )
}


export default PostForm;



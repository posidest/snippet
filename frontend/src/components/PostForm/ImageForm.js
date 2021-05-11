import { useEffect, useState } from 'react';
import React from 'react';
import { postImage } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import './PostForm.css'

const ImageForm = () => {
    const [userId, setUserId] = useState('')
    const [type, setType] = useState('image')
    const [content, setContent] = useState('');
    const [caption, setCaption] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    if (!user) <Redirect to='/' />


    const submitForm = (e) => {
        e.preventDefault();
        let newErrors = [];
        console.log('inside submit form')
        dispatch(postImage({
            type,
            content,
            caption,
            userId: user.id,
        }))
            .then(() => (
                setUserId(''),
                setType(''),
                setContent(null),
                setCaption('')
            ))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    newErrors = data.errors;
                    setErrors(newErrors);
                }
            })
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setContent(file);
    };


    return (
        <div className='form-div'>
            <form onSubmit={submitForm}
                style={{ display: "flex", flexFlow: "column" }}>
                <div className='errors' >
                    {errors && errors.map(err => (
                        <p key={err}>{err}</p>
                    ))}
                </div>
                <label className='file-upload'>
                    <input type='file' onChange={updateFile} placeholder='upload a pic' />
                    Upload an Image
                </label>
                <textarea onChange={(e) => setCaption(e.target.value)} value={caption} placeholder='Add a Caption' />
                <button type='submit'> Post</button>
            </form >
        </div >
    )

}


export default ImageForm;



import { useEffect, useState } from 'react';
import React from 'react';
import { postSomething } from '../../store/posts';
import { useDispatch, useSelector } from 'react-redux';

const ImageForm = () => {
    const [userId, setUserId] = useState('')
    const [type, setType] = useState('image')
    const [content, setContent] = useState('');
    const [caption, setCaption] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user)
    setUserId(user.id);

    const submitForm = (e) => {
        e.preventDefault();
        let newErrors = [];
        dispatch(postSomething({
            type,
            content,
            caption,
            userId,
        }))
            .then(() => (
                setUserId(''),
                setType(''),
                setContent(null),
                setCaption('')
            )).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    newErrors = data.errors;
                    setErrors(newErrors);
                }
            });
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setContent(file);
    };


    return (
        <div>
            <form onSubmit={submitForm}>
                <div className='errors'>
                    {errors.length && errors.map(err => (
                        <p key={err}>{err}</p>
                    ))}
                </div>
                <input type='file' onChange={updateFile} placeholder='upload a pic' />
                <textarea onChange={(e) => setCaption(e.target.value)} value={caption} placeholder='add a caption' />
                <button type='submit'> Post</button>
            </form>
        </div >
    )
}


export default ImageForm;



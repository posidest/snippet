import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postLink } from '../../store/posts';
import { useHistory } from 'react-router-dom'
import './PostForm.css'

const LinkForm = () => {
    const [userId, setUserId] = useState('');
    const [type, setType] = useState('link');
    const [content, setContent] = useState('');
    const [caption, setCaption] = useState('');
    const [errors, setErrors] = useState('');

    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector((state) => state.session.user)
    if (!user) history.push('/')

    const submitForm = (e) => {
        e.preventDefault()
        let newErrors = [];
        // console.log('inside submit form')
        dispatch(postLink({
            type,
            content,
            caption,
            userId: user.id,
        }))
            .then(() => (
                setUserId(''),
                setType(''),
                setContent(''),
                setCaption('')
            )).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    newErrors = data.errors;
                    setErrors(newErrors);
                }
            });
    }

    return (
        <div className='form-div'>
            <form onSubmit={submitForm}
                style={{ display: "flex", flexFlow: "column" }}>
                <div className='errors'>
                    {errors && errors.map(err => (
                        <p key={err}>{err}</p>
                    ))}
                </div>
                <input type='url' onChange={(e) => setContent(e.target.value)} value={content} placeholder='Share a Link' />
                <textarea onChange={(e) => setCaption(e.target.value)} value={caption} placeholder='Add a Caption' />
                <button type='submit'> Post</button>
            </form>
        </div >
    )
}


export default LinkForm;
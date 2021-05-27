import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postWords } from '../../store/post';
import { Redirect,useHistory } from 'react-router-dom'
import './PostForm.css'

const WordsForm = () => {
    const [userId, setUserId] = useState('');
    const [type, setType] = useState('words');
    const [content, setContent] = useState('');
    const [caption, setCaption] = useState('');
    const [errors, setErrors] = useState('');
    const history = useHistory()
    const dispatch = useDispatch();
    // const history = useHistory()
    const user = useSelector((state) => state.session.user)

    if (!user) <Redirect to='/' />
     const blogName = user.blogName;

    const submitForm = (e) => {
        e.preventDefault()
        let newErrors = [];
        // console.log('inside submit form')
        dispatch(postWords({
            type,
            content,
            caption,
            userId: user.id,
        }))
            .then(() => (
                setUserId(''),
                setType(''),
                setContent(''),
                setCaption(''),
                history.push(`/${blogName}`)
            ))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    newErrors = data.errors;
                    setErrors(newErrors);
                }
            })
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
                <textarea onChange={(e) => setContent(e.target.value)} value={content} className='words' placeholder='Write Something' />
                <textarea onChange={(e) => setCaption(e.target.value)} value={caption} placeholder='Add a Caption' />
                <button type='submit'>Post</button>
            </form>
        </div >
    )
}


export default WordsForm;
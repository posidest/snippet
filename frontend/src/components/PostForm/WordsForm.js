import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postWords } from '../../store/posts';
import { useHistory } from 'react-router-dom'

const WordsForm = () => {
    const [userId, setUserId] = useState('');
    const [type, setType] = useState('words');
    const [content, setContent] = useState('');
    const [caption, setCaption] = useState('');
    const [errors, setErrors] = useState('');

    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector((state) => state.session.user)

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
                setCaption('')
            )).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    newErrors = data.errors;
                    setErrors(newErrors);
                }
            });
        // history.push('/dashboard')

    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <div className='errors'>
                    {errors && errors.map(err => (
                        <p key={err}>{err}</p>
                    ))}
                </div>
                <textarea onChange={(e) => setContent(e.target.value)} value={content} placeholder='write something' />
                <textarea onChange={(e) => setCaption(e.target.value)} value={caption} placeholder='add a caption' />
                <button type='submit'>Post</button>
            </form>
        </div >
    )
}


export default WordsForm;
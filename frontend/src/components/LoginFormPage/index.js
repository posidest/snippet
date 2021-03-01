import React, { useState } from 'react';
import './LoginForm.css';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to='/dashboard' />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const handleDemoSubmit = () => {
        return dispatch(sessionActions.login({ credentials: 'Demo-lition', password: 'password' }));
    }


    return (
        <div className='login-div'>
            <h1 className='logo'>snippet</h1>
            <form onSubmit={handleSubmit}
                style={{ display: "flex", flexFlow: "column" }}>
                <div className='errors'>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
                <input
                    type='text'
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    placeholder='Blog Name or Email'
                    required
                />
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    required
                />
                <button type='submit'>Log In</button>
                <button type='button' onClick={handleDemoSubmit} className='demo'>Demo</button>
            </form>
        </div>
    );
}

export default LoginFormPage;

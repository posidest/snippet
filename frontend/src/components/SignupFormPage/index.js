import React, { useState } from "react";
// import './SignupForm.css'
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session"; 
import { createUser } from "../../store/session"

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [email, setEmail] = useState("");
    const [blogName, setBlogName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatar, setAvatar] = useState(null)
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('am i crazy?')
        if (password === confirmPassword) {
            setErrors([]);
            dispatch(createUser({ email, blogName, password, avatar }))
                .then(() => {
                    setBlogName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword('')
                    setAvatar(null);
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                });
        } else {
            return setErrors(['Confirm Password field must be the same as the Password field']);
        }
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setAvatar(file);
    };


    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                required
            />
            <input
                type="text"
                value={blogName}
                onChange={(e) => setBlogName(e.target.value)}
                placeholder='Blog name'
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
            />
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm Password'
                required
            />
            <input
                type='file'
                onChange={updateFile}
                placeholder='Upload a Pic' />
            <button type="submit">Sign Up</button>
        </form >
    );
}

export default SignupFormPage;
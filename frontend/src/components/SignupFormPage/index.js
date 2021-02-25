import React, { useState } from "react";
// import './SignupForm.css'
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [blogName, setBlogName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('am i crazy?')
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, blogName, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
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
            <button type="submit" disabled={errors.length > 0}>Sign Up</button>
        </form>
    );
}

export default SignupFormPage;
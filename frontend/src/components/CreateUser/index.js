import React, { useState } from "react";
import { createUser } from "../../store/session"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import './CreateUser.css'

const CreateUser = () => {
    const [blogName, setBlogName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [errors, setErrors] = useState([]);
    const [image, setImage] = useState(null)

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const history = useHistory()
    if (user) history.push('/dashboard')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            let newErrors = [];
            dispatch(createUser({ blogName, email, password, avatar }))
                .then(() => {
                    setBlogName("");
                    setEmail("");
                    setPassword("");
                    setAvatar(null);
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        newErrors = data.errors;
                        setErrors(newErrors);
                    }
                });
        } else {
            return setErrors(['Confirm Password field must be the same as the Password.'])
        }
    };

    const updateFile = (e) => {
        let file = e.target.files[0];
        setAvatar(file);
        file = URL.createObjectURL(file)
        setImage(file);
    };

    return (
        <div className='create-user'>
            <div className='errors'>
                {errors.length > 0 &&
                    errors.map((error) => <div key={error}>{error}</div>)}
            </div>
            <h1 className='logo'>snippet</h1>
            <div className='form-div'>
                <form
                    style={{ display: "flex", flexFlow: "column" }}
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="Blog name"
                        value={blogName}
                        onChange={(e) => setBlogName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label class='file-upload'>
                        <input type="file"
                            onChange={updateFile} />
                        Upload Avatar
                    </label>
                    {image && (
                        <img src={image} />
                    )}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )
};

export default CreateUser;
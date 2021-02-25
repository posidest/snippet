import React, { useState } from "react";
import { createUser } from "../../store/session"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

const CreateUser = () => {
    const [blogName, setBlogName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const history = useHistory()
    if (user) history.push('/dashboard')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            let newErrors = [];
            // console.log('avatar:', avatar)
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
        const file = e.target.files[0];
        if (file) setAvatar(file);
    };

    return (
        <div>
            {errors.length > 0 &&
                errors.map((error) => <div key={error}>{error}</div>)}
            <form
                style={{ display: "flex", flexFlow: "column" }}
                onSubmit={handleSubmit}
            >
                <label>
                    <input
                        type="text"
                        placeholder="Blog name"
                        value={blogName}
                        onChange={(e) => setBlogName(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                <label>
                    <input type="file" onChange={updateFile} />
                </label>
                <button type="submit">Create User</button>
            </form>
            {/* <div>
                {user && (
                    <div>
                        <h1>{user.blogName}</h1>
                        <img
                            style={{ width: "150px" }}
                            src={user.avatar}
                            alt="avatar"
                        />
                    </div>
                )}
            </div> */}
        </div>
    );
};

export default CreateUser;
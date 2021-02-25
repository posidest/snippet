import { csrfFetch } from './csrf'


const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const removeUser = () => ({
    type: REMOVE_USER
})


export const login = ({ credential, password }) => async (dispatch) => {
    const result = await csrfFetch(`/api/session`, {
        method: 'POST',
        body: JSON.stringify({ credential, password })
    });
    if (result.ok) {
        const user = await result.json();
        dispatch(setUser(user));
        return result;
    }
}


export const logout = () => async (dispatch) => {
    const result = await csrfFetch(`/api/session`, {
        method: 'DELETE'
    });
    if (result.ok) {
        await result.json();
        dispatch(removeUser())
        return result;
    }
}


export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch(`/api/session`);
    if (response.ok) {
        const sessionUser = await response.json();
        dispatch(setUser(sessionUser.user));
        return response;
    }
}

// export const signup = ({ blogName, email, password }) => async (dispatch) => {
//     const response = await csrfFetch('/api/users', {
//         method: 'POST',
//         body: JSON.stringify({
//             blogName,
//             email,
//             password,
//         }),
//     });
//     const newUser = await response.json();
//     console.log('new user: ', newUser)
//     dispatch(setUser(newUser.user));
//     return response;
// };


export const signup = ({ blogName, email, password }) => async (dispatch) => {
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            blogName,
            email,
            password,
        }),
    });
    const newUser = await response.json();
    console.log('new user: ', newUser)
    dispatch(setUser(newUser.user));
    return response;
};




export const createUser = (user) => async (dispatch) => {
    const { avatar, blogName, email, password } = user;
    const formData = new FormData();
    formData.append("blogName", blogName);
    formData.append("email", email);
    formData.append("password", password);


    // for single file
    if (avatar) formData.append("avatar", avatar);

    console.log(formData.get('avatar'));

    const res = await csrfFetch(`/api/users/`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data.user));
        return res;
    }
};




// const initialState = {user: null};

export default function sessionReducer(state = { user: null }, action) {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = { ...state, user: action.payload }
            // console.log('new state:', newState)
            // newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            delete state.user;
            newState = { ...state };
            newState.user = null;
            return newState;
        default: return state;
    }
}





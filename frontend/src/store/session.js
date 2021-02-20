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

export const signup = ({ username, email, password }) => async (dispatch) => {
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    const newUser = await response.json();
    dispatch(setUser(newUser.user));
    return response;
};




export default function sessionReducer(state = { user: null }, action) {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = { ...state, ...action.payload }
            return newState;
        case REMOVE_USER:
            delete state.user;
            newState = { ...state };
            newState.user = null;
            return newState;
        default: return state;
    }
}





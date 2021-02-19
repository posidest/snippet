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


// const initialState = { user: null }

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





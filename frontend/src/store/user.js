import { csrfFetch } from './csrf';


const GET_USER = 'users/getUser';


const getUser = (user) => ({
    type: GET_USER,
    payload: user
})


export const findAUser = (user) => async (dispatch) => {
    const { blogName } = user;
    const res = await csrfFetch(`/api/users/${blogName}`)
    if (res.ok) {
        const data = await res.json();
        dispatch(getUser(data));
        return res;
    }
}

export default function userReducer(state = { user: null }, action) {
    let newState;
    switch (action.type) {
        case GET_USER:
            newState = { ...state, user: action.payload }
            return newState;
        default: return state;
    }
}


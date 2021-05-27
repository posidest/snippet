import { csrfFetch } from './csrf';

const GET_USERS  = 'users/getUsers'
const GET_USER = 'users/getUser';


const getUser = (user) => ({
    type: GET_USER,
    payload: user
})
 
const getUsers = (users) => ({
    type: GET_USERS,
    payload: users
})

export const discoverUsers = () => async (dispatch) => {
    console.log('im insdie the discoverUsers thunk')
    const res = await csrfFetch(`/api/users/`)
    if(res.ok) {
        const data = await res.json()
        console.log(data, 'data from discover users thunk')
        dispatch(getUsers(data.users))
        return data
    }
}


export const findAUser = (user) => async (dispatch) => {
    const { blogName } = user;
    const res = await csrfFetch(`/api/users/${blogName}`)
    if (res.ok) {
        const data = await res.json();
        dispatch(getUser(data.user));
        return data;
    }
}


export default function userReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_USER:
            newState = { ...state, user: action.payload }
            return newState;
        case GET_USERS:
            newState = {...state, users: action.payload}
            return newState;
        default: return state;
    }
}


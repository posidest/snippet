import { csrfFetch } from './csrf';


const ADD_FOLLOW = 'follows/addFollow'
const GET_FOLLOWS = 'follows/getFollows'
const UNFOLLOW = 'follows/removeFollow'
const GET_FOLLOWERS = 'follows/getFollowers'

const addFollow = (follow) => ({
    type: ADD_FOLLOW,
    payload: follow
})

const getFollows = (following) => ({
    type: GET_FOLLOWS,
    payload: following
})

const removeFollow = (follow) => ({
    type: UNFOLLOW,
    payload: follow
})

const getFollowers = (followers) => ({
    type: GET_FOLLOWERS,
    payload: followers
})


export const followBlog = (follow) => async (dispatch) => {
    const { blogId, userId } = follow;
    const res = await csrfFetch(`/api/blog/follows`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blogId, userId })
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(addFollow(data.follow));
        return res;
    }
}


export const showFollows = () => async (dispatch) => {
    const res = await csrfFetch(`/api/blog/following`);
    if (res.ok) {
        const data = await res.json();
        dispatch(getFollows(data.following))
        return data;
    }
}



export const unFollowBlog = (follow) => async (dispatch) => {
    const { blogId, userId } = follow;
    const res = await csrfFetch(`/api/blog/${blogId}/follows`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(removeFollow(data.follow));
        return res;
    }
}


export default function followReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_FOLLOWS:
            newState = { ...state,  ['following']: action.payload }
            return newState;
        case ADD_FOLLOW:
            newState = { ...state}
            newState['following'] = [...state.following, action.payload];
            return newState;
        case GET_FOLLOWERS: 
            newState = {...state, ...action.payload}
            return newState;
        case UNFOLLOW:
            const updatedUserFollows = state.userFollows.filter((follow) => follow !== action.payload)
            // const updatedUserFollows = state.userFollows.slice(0, action.payload).concat(state.userFollows.slice(action.payload))
            const updatedFollows = state.follows.filter((follow) => follow !== action.payload)
            newState = { ...state, following: [...updatedFollows, ...updatedUserFollows]}
            return newState;
        default: return state;
    }
}
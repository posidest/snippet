import { csrfFetch } from './csrf';


const ADD_FOLLOW = 'follows/addFollow'
const GET_FOLLOWS = 'follows/getFollows'
const UNFOLLOW = 'follows/removeFollow'

const addFollow = (follow) => ({
    type: ADD_FOLLOW,
    payload: follow
})

const getFollows = (follows) => ({
    type: GET_FOLLOWS,
    payload: follows
})

const removeFollow = (follow) => ({
    type: UNFOLLOW,
    payload: follow
})

export const followBlog = (follow) => async (dispatch) => {
    const { blogId, userId } = follow;
    const res = await csrfFetch('/api/blog/follows', {
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
    // const { userId } = user;
    const res = await csrfFetch(`/api/blog/follows`);
    if (res.ok) {
        const data = await res.json();
        dispatch(getFollows(data.follows))
        return res;
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


export default function followReducer(state = { follows: [] }, action) {
    let newState;
    switch (action.type) {
        case ADD_FOLLOW:
            newState = { ...state, follows: [...state.follows, action.payload] }
            return newState;
        case GET_FOLLOWS:
            newState = { ...state, follows: [...state.follows], userFollows: action.payload }
            return newState;
        // case UNFOLLOW:
        //     // const updatedUserFollows = state.userFollows.filter((follow) => follow !== action.payload)
        //     const updatedUserFollows = state.userFollows.slice(0, action.payload).concat(state.userFollows.slice(action.payload))
        //     const updatedFollows = state.follows.filter((follow) => follow !== action.payload)
        //     newState = { ...state, follows: updatedFollows, userFollows: updatedUserFollows }
        //     return newState;
        default: return state;
    }
}
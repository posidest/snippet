import { csrfFetch } from './csrf';


const ADD_LIKE = 'likes/likePost'
const SHOW_LIKES = 'likes/getLikes'
const UNLIKE = 'likes/removeLike'

const likePost = (like) => ({
    type: ADD_LIKE,
    payload: like
});

const getLikes = (likes) => ({
    type: SHOW_LIKES,
    payload: likes
})

const removeLike = (like) => ({
    type: UNLIKE,
    payload: like
})

export const likeAPost = (like) => async (dispatch) => {
    const { postId, userId } = like;
    const res = await csrfFetch(`/api/posts/likes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId }),
    });
    if (res.ok) {
        const data = await res.json();
        console.log({ data, event: likePost(data.like) }, 'from likeAPost')
        dispatch(likePost(data.like));
        return res;
    }

}

export const unLikePost = (like) => async (dispatch) => {
    const { postId, userId } = like;
    const res = await csrfFetch(`/api/posts/${postId}/likes`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(removeLike(data.like))
        return res;
    }
}

export const showLikes = () => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/likes/`);
    if (res.ok) {
        const data = await res.json();
        dispatch(getLikes(data.likes))
        return res;
    }
}


export default function likeReducer(state = { likes: [] }, action) {
    let newState;
    switch (action.type) {
        case ADD_LIKE:
            newState = { ...state, likes: [...state.likes, action.payload] }
            return newState;
        case SHOW_LIKES:
            newState = { ...state, likes: [...state.likes], userLikes: action.payload }
            return newState;
        // case UNLIKE:
        //     const updatedUserLikes = state.userLikes.filter((like) => like !== action.payload)
        //     const updatedLikes = state.likes.filter((like) => like !== action.payload)
        //     newState = { ...state, likes: updatedLikes, userLikes: updatedUserLikes }
        //     return newState;
        default: return state;
    }
}
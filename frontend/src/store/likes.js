import { csrfFetch } from './csrf';


const ADD_LIKE = 'likes/likePost'


const likePost = (like) => ({
    type: ADD_LIKE,
    payload: like
});


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


export default function likeReducer(state = { likes: [] }, action) {
    let newState;
    switch (action.type) {
        case ADD_LIKE:
            newState = { ...state, likes: [...state.likes, action.payload] }
            return newState;
        default: return state;
    }
}
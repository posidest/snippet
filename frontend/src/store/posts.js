import { csrfFetch } from './csrf';


const POST_MEDIA = 'post/createPost'



const createPost = (post) => ({
    type: POST_MEDIA,
    payload: post
});


export const postSomething = (post) => async (dispatch) => {
    const { type, content, caption, userId } = post;
    const formData = new FormData();
    formData.append('type', type);
    formData.append('content', content)
    formData.append('userId', userId);

    if (caption) formData.append('caption', caption);

    const res = await csrfFetch('/api/posts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(createPost(data.post))
        return res;
    }
}



export default function postReducer(state = { post: null }, action) {
    let newState;
    switch (action.type) {
        case POST_MEDIA:
            newState = { ...state, post: action.payload }
            return newState;
        default: return state;
    }
}
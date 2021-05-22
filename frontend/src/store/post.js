import { csrfFetch } from './csrf';


const POST_MEDIA = 'posts/createPost'

const GET_POSTS = 'posts/displayPosts'

const GET_BLOG_POSTS = 'posts/getBlogPosts'

const REBLOG  = 'posts/reblog'

const GET_POST = 'post/getPost'


const displayPosts = (posts) => ({
    type: GET_POSTS,
    payload: posts
})

const createPost = (post) => ({
    type: POST_MEDIA,
    payload: post
});

const getBlogPosts = (blogPosts) => ({
    type: GET_BLOG_POSTS,
    payload: blogPosts
})

const reblog = (post) => ({
    type: REBLOG,
    payload: post  
})

const getPost = (post) => ({
    type: GET_POST,
    payload: post
})


export const showPosts = () => async (dispatch) => {
    const res = await csrfFetch('/api/posts');
    if (res.ok) {
        const data = await res.json();
        console.log('data from thunk', data)
        dispatch(displayPosts(data));
        return res;
    }
}


export const populateBlog = (blog) => async (dispatch) => {
    const { userId } = blog;
    const res = await csrfFetch(`/api/blog/${userId}`)
    if (res.ok) {
        const data = await res.json();
        console.log(data)
        dispatch(getBlogPosts(data));
        return data;
    }
}

export const showPost = (postId) => async(dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`)
    if (res.ok) {
        const data = await res.json()
        console.log(data, 'data from showPost thunk')
        dispatch(getPost(data))
        return data
    }
}



export const postImage = (post) => async (dispatch) => {
    const { type, content, caption, userId } = post;
    const formData = new FormData();
    formData.append('type', type);
    formData.append('content', content)
    formData.append('userId', userId);

    if (caption) formData.append('caption', caption);

    const res = await csrfFetch('/api/posts/image', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    });
    if (res.ok) {
        const data = await res.json();
        console.log('data from thunk', data)
        dispatch(createPost(data.post))
        return res;
    }
}

export const postWords = (post) => async (dispatch) => {
    const { type, content, caption, userId } = post;

    const res = await csrfFetch('/api/posts/words', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    if (res.ok) {
        const data = await res.json();
        console.log('data from thunk', data)
        dispatch(createPost(data.post))
        return res;
    }
}

export const postLink = (post) => async (dispatch) => {
    const { type, content, caption, userId } = post;

    const res = await csrfFetch('/api/posts/link', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    if (res.ok) {
        const data = await res.json();
        console.log('data from thunk', data)
        dispatch(createPost(data.post))
        return res;
    }
}


export const reblogPost = (post) => async (dispatch) => {
    const {type, content, caption, ownerId} = post;
        const res = await csrfFetch(`/api/posts/reblog`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({type, content, caption, ownerId}),
    });
    if (res.ok) {
        const data = await res.json();
        console.log('data from reblog thunk', data)
        dispatch(createPost(data))
        return res;
    }
}


export default function postReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case POST_MEDIA:
            newState = { ...state, ...action.payload }
            return newState;
        case GET_POSTS:
            newState = { ...state, ...action.payload }
            return newState;
        case GET_BLOG_POSTS:
            newState = { ...state, ...action.payload }
            return newState;
        case GET_POST:
            newState = {...state, ...action.payload}
            return newState;
        default: return state;
    }
}
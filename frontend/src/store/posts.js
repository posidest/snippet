import { csrfFetch } from './csrf';


const POST_MEDIA = 'post/createPost'

const GET_POSTS = 'post/displayPosts'

const GET_BLOG_POSTS = 'post/showBlog'


const displayPosts = (posts) => ({
    type: GET_POSTS,
    payload: posts
})

const createPost = (post) => ({
    type: POST_MEDIA,
    payload: post
});

const showBlog = (blogPosts) => ({
    type: GET_BLOG_POSTS,
    payload: blogPosts
})


export const showPosts = () => async (dispatch) => {
    const res = await csrfFetch('/api/posts');
    if (res.ok) {
        const data = await res.json();
        console.log('data from thunk', data)
        dispatch(displayPosts(data.posts));
        return res;
    }
}


export const populateBlog = (blog) => async (dispatch) => {
    const { userId } = blog;
    const res = await csrfFetch(`/api/posts/${userId}`)
    if (res.ok) {
        const data = await res.json();
        console.log(data)
        dispatch(showBlog(data.blogPosts));
        return res;
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


export default function postReducer(state = { post: null }, action) {
    let newState;
    switch (action.type) {
        case POST_MEDIA:
            newState = { ...state, post: action.payload }
            return newState;
        case GET_POSTS:
            newState = { ...state, posts: action.payload }
            return newState;
        case GET_BLOG_POSTS:
            newState = { ...state, posts: [...state.posts], blogPosts: action.payload }
            return newState;
        default: return state;
    }
}
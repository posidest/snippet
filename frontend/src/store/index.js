import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import postReducer from './posts';
import sessionReducer from './session'
import likeReducer from './likes'
import userReducer from './users'
import followReducer from './follows'

const rootReducer = combineReducers({
    session: sessionReducer,
    post: postReducer,
    likes: likeReducer,
    user: userReducer,
    follows: followReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
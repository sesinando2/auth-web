import React from 'react';
import {render} from 'react-dom';

import {createStore} from 'redux';

/*import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

import rootReducer from './advanced/reducers'
import {selectSubreddit, fetchPostsIfNeeded} from './advanced/actions'*/


import rootReducer from './basic/reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// import App from './App';
import Root from './router/components/Root'

import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer);

/* Advanced Example
const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ));

store.dispatch(selectSubreddit('reactjs'));
store.dispatch(fetchPostsIfNeeded('reactjs')).then(() => console.log(store.getState()));*/

render(
    <Root store={store}/>,
    document.getElementById('root')
);

registerServiceWorker();

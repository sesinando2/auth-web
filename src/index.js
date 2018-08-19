import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

import rootReducer from './advanced/reducers'
import {selectSubreddit, fetchPostsIfNeeded} from './advanced/actions'

/* basicReducer
import rootReducer from './basic/reducers';*/

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

/* Basic store
const store = createStore(rootReducer);*/

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ));

store.dispatch(selectSubreddit('reactjs'));
store.dispatch(fetchPostsIfNeeded('reactjs')).then(() => console.log(store.getState()));

render(
    <App />,
    document.getElementById('root')
);

registerServiceWorker();

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
// import Root from './router/components/Root'
import Root from './advanced/container/Root'

import registerServiceWorker from './registerServiceWorker';

// const store = createStore(rootReducer);

render(
    <Root/>,
    document.getElementById('root')
);

registerServiceWorker();

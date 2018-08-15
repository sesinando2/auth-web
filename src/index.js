import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './basic/reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './basic/components/App';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

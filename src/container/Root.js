import React from 'react'
import {Provider} from 'react-redux'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import configureStore from '../configureStore'
import {retrieveToken} from '../actions/auth'

import PrivateRoute from './PrivateRoute'

import Dashboard from '../component/Dashboard/Dashboard'

import Auth from './Auth'

const store = configureStore();
store.dispatch(retrieveToken());

export default () => (
    <Provider store={store}>
        <Router>
            <span>
                <PrivateRoute path="" component={Dashboard}/>

                <Route path="/sign-in" component={Auth}/>
                <Route path="/sign-out" component={Auth}/>
            </span>
        </Router>
    </Provider>
);

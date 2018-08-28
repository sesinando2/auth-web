import React from 'react'
import {Provider} from 'react-redux'
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'

import configureStore from '../configureStore'
import {retrieveToken} from '../actions/auth'

import PrivateRoute from './PrivateRoute'

import Dashboard from '../component/Dashboard/Dashboard'

import Auth from './Auth'
import {getClientList} from "../actions/client";

const store = configureStore();
store.dispatch(retrieveToken());
store.dispatch(getClientList());

export default () => (
    <Provider store={store}>
        <Router>
            <span>
                <PrivateRoute path="" exact render={() => (<Redirect to="/dashboard" />)} />

                <PrivateRoute path="/dashboard" component={Dashboard}/>

                <Route path="/sign-in" exact component={Auth}/>
                <Route path="/sign-out" exact component={Auth}/>
            </span>
        </Router>
    </Provider>
);

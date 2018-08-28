import React, {Component} from 'react'
import {connect} from 'react-redux'
import qs from 'query-string'

import {Redirect} from 'react-router-dom'

import {getToken, clearAuthentication} from '../actions/auth'

import SignIn from '../component/SignIn/SignIn'

const REDIRECT_URL = 'http://localhost:3000';
const AUTH_URL = `http://localhost:10082/oauth/authorize?response_type=code&client_id=admin&redirect_uri=${REDIRECT_URL}`;
const LOGOUT_URL = 'http://localhost:10082/logout';

class Auth extends Component {

    componentDidMount() {
        let {dispatch, authentication, location} = this.props;
        let searchParams = qs.parse(location.search);

        if (location.pathname === '/sign-out') {
            dispatch(clearAuthentication());
            window.location = LOGOUT_URL;
        }

        if (!authentication.isAuthenticated && !authentication.isAuthenticating && searchParams.code) {
            dispatch(getToken(searchParams.code));
        }
    }

    render() {
        let {location, authentication} = this.props;

        if (authentication.isAuthenticated) {
            let redirectTo = location.from || '';
            return <Redirect to={redirectTo} exact strict />
        }

        return <SignIn authorizationUrl={AUTH_URL} isAuthenticating={authentication.isAuthenticating} />
    }
}

const mapStateToProps = (state) => ({authentication: state.authentication});

export default connect(mapStateToProps)(Auth);


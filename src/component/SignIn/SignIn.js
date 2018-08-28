import React, {Component} from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

import logo from './bootstrap-solid.svg';

const Wrapper = styled.div`
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
    height: 100%;
`;

export default class SignIn extends Component {
    render() {
        let {authorizationUrl, isAuthenticating} = this.props;

        let button = isAuthenticating ?
            <a className="btn btn-lg btn-primary btn-block disabled" disabled={true}>Signing in...</a> :
            <a className="btn btn-lg btn-primary btn-block" href={authorizationUrl}>Sign in</a>;

        return (
            <Wrapper>
                <div className="form-signin text-center">
                    <img className="mb-4" src={logo} alt="" width="72" height="72" />

                    <h1 className="h3 mb-3 font-weight-normal">Auth</h1>

                    <p>Please sign in to continue using the app.</p>

                    {button}

                    <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
                </div>
            </Wrapper>
        );
    }
}

SignIn.propTypes = {
    authorizationUrl: PropTypes.string.isRequired,
    isAuthenticating: PropTypes.bool.isRequired
};
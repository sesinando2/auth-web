import React, {Component} from 'react';
import styled from 'styled-components';

import logo from './images/bootstrap-solid.svg';
import './App.css';

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

class App extends Component {
    render() {
        return (
            <Wrapper>
                <div className="form-signin text-center">
                    <img className="mb-4" src={logo} alt="" width="72" height="72" />

                    <h1 className="h3 mb-3 font-weight-normal">Auth</h1>

                    <p>Please sign in to continue using the app.</p>

                    <button className="btn btn-lg btn-primary btn-block">Sign in</button>

                    <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
                </div>
            </Wrapper>
        );
    }
}

export default App;

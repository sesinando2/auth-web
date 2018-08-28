import React from 'react'
import {connect} from 'react-redux'

import {Redirect, Route} from 'react-router-dom'

const mapStateToProps = (state) => ({authentication: state.authentication});

const PrivateRoute = ({component: Component, authentication, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            authentication.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/sign-in",
                        search: props.location.search,
                        state: {from: props.location}
                    }}
                />
            )
        }
    ></Route>
);

export default connect(mapStateToProps)(PrivateRoute)






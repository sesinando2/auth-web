import React, {Component} from 'react'
import PrivateRoute from '../../container/PrivateRoute'

import './Dashboard.css'

import Header from './Header'
import Sidebar from './Sidebar'

import Page from './Page'
import ClientList from '../../container/ClientList'

const User = () => {
    return <Page title="User"/>;
};

export default class Dashboard extends Component {

    render() {
        return (
            <span>
                <Header />

                <div className="container-fluid">
                    <div className="row">
                        <Sidebar {...this.props} />

                        <PrivateRoute path="/dashboard/client" component={ClientList} />
                        <PrivateRoute path="/dashboard/user" component={User} />
                    </div>
                </div>
            </span>
        );
    }
}
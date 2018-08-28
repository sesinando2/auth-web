import React, {Component} from 'react'
import PrivateRoute from '../../container/PrivateRoute'

import './Dashboard.css'

import Header from './Header'
import Sidebar from './Sidebar'

const User = () => {
  return (
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">User</h1>
          </div>

      </main>
  );
};

const Client = () => {
    return (
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Client</h1>
            </div>

        </main>
    );
};

export default class Dashboard extends Component {

    render() {
        return (
            <span>
                <Header />

                <div className="container-fluid">
                    <div className="row">
                        <Sidebar {...this.props} />

                        <PrivateRoute path="/dashboard/client" component={Client} />
                        <PrivateRoute path="/dashboard/user" component={User} />
                    </div>
                </div>
            </span>
        );
    }
}
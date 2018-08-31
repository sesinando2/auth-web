import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

import PrivateRoute from '../../../container/PrivateRoute'
import Page from '../Page'
import List from '../List'

import Client from '../../../container/Client'

class ClientList extends Component {
  render() {
      const {clients} = this.props;
      const clientList = clients.map(({id, clientId}) => (
          <NavLink to={`/dashboard/client/${id}`}
                   key={id}
                   className="list-group-item list-group-item-action"
          >{clientId}</NavLink>
      ));

      return (
          <Page title="Client">
            <div className="row">
              <div className="col-3">
                <List title="Client List" items={clientList}/>
              </div>

              <div className="col-9">
                <PrivateRoute path="/dashboard/client/:id" component={Client} />
              </div>
            </div>
          </Page>
      )
  }
}

ClientList.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ClientList;
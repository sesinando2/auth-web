import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

import Page from '../Page'
import List from '../List'

class ClientList extends Component {
  render() {
      const {clients} = this.props;
      const clientList = clients.map(({clientId}) => (
          <NavLink to={`/dashboard/client/${clientId}`}
                   key={clientId}
                   className="list-group-item list-group-item-action"
          >{clientId}</NavLink>
      ));

      return (
          <Page title="Client">
            <div className="row">
              <div className="col-3">
                <List title="Client List" items={clientList}/>
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
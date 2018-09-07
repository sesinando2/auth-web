import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

import PrivateRoute from '../../../container/PrivateRoute'
import Page from '../Page'

import Client from '../../../container/Client'

class ClientList extends Component {
  render() {
      const {clients} = this.props;
      const clientList = clients.map(({id, clientId}) => (
          <NavLink to={`/dashboard/client/${id}`} key={id}
                   className="list-group-item list-group-item-action"
          >{clientId}</NavLink>
      ));

      return (
          <Page title="Client">
              <div className="row">
                  <div className="col-3">
                      <div className="card">
                          <div className="card-header">
                              Client List
                              <NavLink to="/dashboard/client/new" className="fa-pull-right">
                                  <FontAwesomeIcon icon={faPlus} />
                              </NavLink>
                          </div>

                          <div className="list-group list-group-flush">{clientList}</div>
                      </div>
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
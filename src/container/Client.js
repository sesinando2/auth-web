import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import ClientForm from '../component/Dashboard/Client/Form'

const Client = (props) => {
    const {clients, match} = props;
    const client = clients[match.params.id];
    return <ClientForm client={Object.assign({}, client)} />
};

const mapStateToProps = (state) => ({clients: state.client.entities});

export default withRouter(connect(mapStateToProps)(Client));
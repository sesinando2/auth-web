import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import List from '../component/Dashboard/Client/List'

import {getClientList} from "../actions/client";

class ClientList extends Component {

    componentDidMount() {
        let {dispatch} = this.props;
        dispatch(getClientList())
    }

    render() {
        let {client} = this.props;
        let entities = client.entities;
        let clients = Object.keys(entities).map((key => entities[key]));
        return <List clients={clients}/>
    }
}

const mapStateToProps = (state) => ({client: state.client});

export default withRouter(connect(mapStateToProps)(ClientList));
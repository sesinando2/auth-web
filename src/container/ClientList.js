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
        return <List clients={client.entities}/>
    }
}

const mapStateToProps = (state) => ({client: state.client});

export default withRouter(connect(mapStateToProps)(ClientList));
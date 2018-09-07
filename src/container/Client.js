import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Redirect} from 'react-router-dom'

import {clearForm, setClient, updateForm} from '../actions/client/form';

import ClientForm from '../component/Dashboard/Client/Form'
import {createClient, RECEIVE_NEW_CLIENT, updateClient, deleteClient} from "../actions/client/index";

class Client extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectTo: null
        };
    }

    componentDidMount() {
        this.setClientOrRedirect();
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(clearForm());
    }

    componentDidUpdate(prevProps) {
        const {match} = this.props;
        if (prevProps.match.params.id !== match.params.id) {
            this.setClientOrRedirect();
        }
    }

    setClientOrRedirect() {
        const {dispatch, match, clients} = this.props;
        if (this.isNew() || clients[match.params.id]) {
            dispatch(setClient(match.params.id));
            this.setState({redirectTo: null})
        } else {
            this.setState({redirectTo: '/dashboard/client'});
        }
    }

    updateForm(values) {
        const {dispatch} = this.props;
        return dispatch(updateForm(values));
    }

    submitForm(values) {
        const {dispatch} = this.props;
        if (this.isNew()) {
            return this.createNewClient(values);
        } else {
            return dispatch(updateClient(values));
        }
    }

    createNewClient(values) {
        const {dispatch} = this.props;

        return dispatch(createClient(values)).then((response) => {
            if (response && response.type === RECEIVE_NEW_CLIENT) {
                this.setState({redirectTo: `/dashboard/client/${response.json.id}`});
            }
        });
    }

    deleteExistingClient(clientId) {
        const {dispatch} = this.props;

        return dispatch(deleteClient(clientId)).then(() => {
            this.setState({redirectTo: '/dashboard/client'});
        });
    }

    isNew() {
        const {match} = this.props;
        return match.params.id === 'new';
    }

    shouldRedirect() {
        const {redirectTo} = this.state;
        const {match} = this.props;
        return redirectTo && redirectTo !== match.url;
    }

    render() {
        if (this.shouldRedirect()) {
            return <Redirect to={this.state.redirectTo} />
        } else {
            return <ClientForm form={this.props.form}
                               onChange={(values) => this.updateForm(values)}
                               onSubmit={(values) => this.submitForm(values)}
                               onDelete={(clientId) => this.deleteExistingClient(clientId)}
                               isNew={this.isNew()} />
        }
    }
}

const mapStateToProps = (state) => ({form: state.client.form, clients: state.client.entities});

export default withRouter(connect(mapStateToProps)(Client));
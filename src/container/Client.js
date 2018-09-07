import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Redirect} from 'react-router-dom'

import {clearForm, setClient, updateForm} from '../actions/client/form';

import ClientForm from '../component/Dashboard/Client/Form'
import {createClient, RECEIVE_NEW_CLIENT, updateClient} from "../actions/client/index";

class Client extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectTo: null
        };
    }

    componentDidMount() {
        const {dispatch, match} = this.props;
        dispatch(setClient(match.params.id));
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(clearForm());
    }

    componentDidUpdate(prevProps) {
        const {dispatch, match} = this.props;
        if (prevProps.match.params.id !== match.params.id) {
            dispatch(setClient(match.params.id));
            this.setState({redirectTo: null})
        }
    }

    updateForm(values) {
        const {dispatch} = this.props;
        return dispatch(updateForm(values));
    }

    submitForm(values) {
        const {dispatch, match} = this.props;
        if (match.params.id === 'new') {
            return dispatch(createClient(values)).then((response) => {
                console.log(response);
                if (response && response.type === RECEIVE_NEW_CLIENT) {
                    this.setState({redirectTo: `/dashboard/client/${response.json.id}`});
                }
            });
        } else {
            return dispatch(updateClient(values));
        }
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
            return <ClientForm form={this.props.form} onChange={(value) => this.updateForm(value)} onSubmit={(value) => this.submitForm(value)} />
        }
    }
}

const mapStateToProps = (state) => ({form: state.client.form});

export default withRouter(connect(mapStateToProps)(Client));
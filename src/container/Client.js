import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {clearForm, editClient, updateForm} from '../actions/client/form';

import ClientForm from '../component/Dashboard/Client/Form'
import {updateClient} from "../actions/client/index";

class Client extends Component {

    componentDidMount() {
        const {dispatch, match} = this.props;
        dispatch(editClient(match.params.id));
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(clearForm());
    }

    componentDidUpdate(prevProps) {
        const {dispatch, match} = this.props;
        if (prevProps.match.params.id !== match.params.id) {
            dispatch(editClient(match.params.id));
        }
    }

    updateForm(values) {
        const {dispatch} = this.props;
        dispatch(updateForm(values));
    }

    submitForm(values) {
        const {dispatch} = this.props;
        dispatch(updateClient(values))
    }

    render() {
        const {form} = this.props;
        return <ClientForm form={form}
                           onChange={(value) => this.updateForm(value)}
                           onSubmit={(value) => this.submitForm(value)} />
    }
}

const mapStateToProps = (state) => ({form: state.client.form});

export default withRouter(connect(mapStateToProps)(Client));
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {clearForm, editClient, updateForm} from '../actions/client'

import ClientForm from '../component/Dashboard/Client/Form'

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

    render() {
        const {form} = this.props;
        const updateForm = this.updateForm.bind(this);
        return <ClientForm form={form} onChange={updateForm} />
    }
}

const mapStateToProps = (state) => ({form: state.client.form});

export default withRouter(connect(mapStateToProps)(Client));
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Form} from 'react-form'

import {TextField} from "../Field"

export default class ClientForm extends React.Component {

    constructor(props) {
        super(props);
        this.setApi = this.setApi.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidUpdate(prev) {
        const {form} = this.props;

        if (prev.form.current !== form.current) {
            this.formApi.resetAll();
        }

        this.formApi.setAllValues(form.values);

        for (let field in form.errors) {
            this.formApi.setError(field, form.errors[field]);
        }
    }

    setApi(formApi) {
        this.formApi = formApi;
    }

    onChange(formState) {
        this.props.onChange(formState.values);
    }

    validateRequired(errorMessage, value) {
        if (value === null || value === undefined || value === '') {
            return {error: errorMessage}
        }

        return null;
    }

    render() {
        const validateClientId = (value) => this.validateRequired('Please enter a valid Client ID.', value);
        const validateClientSecret = (value) => this.validateRequired('Please enter a valid Client Secret.', value);

        return (
            <Form getApi={this.setApi} onChange={this.onChange}>
                {formApi => (
                    <form onSubmit={formApi.submitForm}>
                        <TextField name="clientId" label="Client ID"
                                   helpText="Please specify a unique identifier for your client"
                                   placeholder="A unique identifier for the client"
                                   formApi={formApi} validate={validateClientId} />

                        <TextField name="secret" label="Client Secret"
                                   helpText="Please specify the secret key for the client"
                                   placeholder="A secret key used with the Client ID for authentication"
                                   formApi={formApi} validate={validateClientSecret} />
                        <button className="btn btn-primary" type="submit">Save</button>
                    </form>
                )}
            </Form>
        );
    }
}

ClientForm.propTypes = {
    form: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};


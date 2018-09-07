import React from 'react'
import PropTypes from 'prop-types'
import {Form} from 'react-form'

import TextField from '../../Field/TextField'
import SelectField from '../../Field/SelectField'
import MultiValuedTextField from '../../Field/MultiValuedTextField'

export default class ClientForm extends React.Component {

    constructor(props) {
        super(props);
        this.setApi = this.setApi.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }

    componentDidUpdate(prev) {
        const {form} = this.props;
        const isDifferentClient = prev.form.current !== form.current;
        const formHasBeenSubmitted = this.formApi.getFormState().submitted;
        const shouldReset = isDifferentClient || formHasBeenSubmitted;

        if (shouldReset) {
            this.formApi.resetAll();
        }

        this.formApi.setAllValues(form.values);
        this.setFormErrors(form.errors);
    }

    setFormErrors(errors) {
        for (let field in errors) {
            this.formApi.setError(field, errors[field]);
        }
    }

    setApi(formApi) {
        this.formApi = formApi;
    }

    onChange(formState) {
        const isDirty = Object.keys(formState.touched).length > 0;

        if (!formState.submitting && !formState.submitted && isDirty) {
            this.props.onChange(formState.values);
        }
    }

    onSubmit(values) {
        this.props.onSubmit(values);
    }

    validateRequired(errorMessage, value) {
        if (value === null || value === undefined || value === '' || value.length === 0) {
            return {error: errorMessage}
        }

        return null;
    }

    renderForm(formApi) {
        const validateClientId = (value) => this.validateRequired('Please enter a valid Client ID.', value);
        const validateClientSecret = (value) => this.validateRequired('Please enter a valid Client Secret.', value);
        const dirty = Object.keys(formApi.getFormState().touched).length > 0;
        const formState = formApi.getFormState();
        const isSubmitting = formState.submitting && formState.submitted;
        const disableSubmit = !dirty || formApi.errors || isSubmitting;

        return (
            <form onSubmit={formApi.submitForm}>
                <TextField name="clientId" label="Client ID"
                           helpText="Please specify a unique identifier for your client"
                           placeholder="A unique identifier for the client"
                           formApi={formApi} validate={validateClientId} />

                <TextField name="secret" label="Client Secret"
                           helpText="Please specify the secret key for the client"
                           placeholder="A secret key used with the Client ID for authentication"
                           formApi={formApi} validate={validateClientSecret} />

                <SelectField name="resourceIds" label="Resources"
                             helpText="Please select all resources to allow access to"
                             options={[
                                 {label: 'Authentication', value: 'AUTH'},
                                 {label: 'Finance', value: 'FINANCE'}
                             ]} multiple={true} />

                <SelectField name="authorizedGrantTypes" label="Authorised Grant Types"
                             helpText="Please select all authorised grant types to allow"
                             options={[
                                 {label: 'Implicit', value: 'IMPLICIT'},
                                 {label: 'Authorization Code', value: 'AUTHORIZATION_CODE'},
                                 {label: 'Client Credentials', value: 'CLIENT_CREDENTIALS'},
                                 {label: 'Password', value: 'PASSWORD'},
                                 {label: 'Refresh Token', value: 'REFRESH_TOKEN'}
                             ]} multiple={true} />

                <SelectField name="scope" label="Scope"
                             helpText="Please select all scopes that apply"
                             options={[
                                 {label: 'Read', value: 'READ'},
                                 {label: 'Write', value: 'WRITE'},
                                 {label: 'Trust', value: 'TRUST'}
                             ]} multiple={true} />

                <MultiValuedTextField name="roles" label="Roles"
                                      placeholder="Enter role name"
                                      helpText="Please select all roles that apply" />

                <MultiValuedTextField name="registeredRedirectUris" label="Registered Redirect URLs"
                                      placeholder="Enter URL to redirect to"
                                      helpText="Please specify allowed redirect URLs" />

                <button className="btn btn-primary fa-pull-right" type="submit" disabled={disableSubmit}>Save</button>
            </form>
        )
    }

    render() {
        return <Form getApi={this.setApi} onChange={this.onChange} onSubmit={this.onSubmit}>{this.renderForm}</Form>
    }
}

ClientForm.propTypes = {
    form: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};


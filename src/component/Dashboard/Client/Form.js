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
    }

    componentDidUpdate(prev) {
        const {form} = this.props;
        const isDifferentClient = prev.form.current !== form.current;
        if (isDifferentClient) {
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
        this.props.onChange(formState.values);
    }

    validateRequired(errorMessage, value) {
        if (value === null || value === undefined || value === '' || value.length === 0) {
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

                        <SelectField name="roles" label="Roles"
                                     helpText="Please select all roles that apply"
                                     options={[
                                         {label: 'Administrator', value: 'Admin'},
                                         {label: 'User', value: 'USER'}
                                     ]} multiple={true} />

                        <MultiValuedTextField name="registeredRedirectUris" label="Registered Redirect URLs"
                                              helpText="Please specify allowed redirect URLs"/>

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


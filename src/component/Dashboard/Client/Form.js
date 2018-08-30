import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Form} from 'react-form'

import {TextField} from "../Field"

export default class ClientForm extends Component {

    validateClientId(value) {
        if (!value) {
            return {error: 'Please enter a valid Client ID'}
        }
    }

    validateClientSecret(value) {
        if (!value) {
            return {error: 'Please enter a valid Client Secret'}
        }
    }

    render() {
        const {client} = this.props;
        const validateClientId = this.validateClientId.bind(this);
        const validateClientSecret = this.validateClientSecret.bind(this);

        let values = Object.assign({}, client);

        return (
            <Form values={values}>
                {formApi => (
                    <form onSubmit={formApi.submitForm}>
                        <TextField name="clientId" label="Client ID"
                                   helpText="Please specify a unique identifier for your client"
                                   placeholder="A unique identifier for the client"
                                   validate={validateClientId}
                                   errors={formApi.errors} />
                        <TextField name="secret" label="Client Secret"
                                   helpText="Please specify the secret key for the client"
                                   placeholder="A secret key used with the Client ID for authentication"
                                   validate={validateClientSecret}
                                   errors={formApi.errors} />
                        <button className="btn btn-primary" type="submit">Save</button>
                    </form>
                )}
            </Form>
        );
    }
}

ClientForm.propTypes = {
    client: PropTypes.object.isRequired
};


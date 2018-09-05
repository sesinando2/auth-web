import React from 'react'
import PropTypes from 'prop-types'
import {Text} from 'react-form'
import {BaseField} from "./Base"

export default class TextField extends BaseField {

    renderFieldBody(baseProperties) {
        const {name, error} = baseProperties;
        const {placeholder, asyncValidate, validate} = this.props;
        const className = error ? 'form-control is-invalid' : 'form-control';
        return <Text field={name} id={name} className={className} validate={validate} asyncValidate={asyncValidate} placeholder={placeholder} />
    }
}

TextField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    formApi: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    helpText: PropTypes.string,
    validate: PropTypes.func,
    asyncValidate: PropTypes.func
};
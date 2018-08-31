import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Text} from 'react-form'

export class Field extends Component {
    render() {
        const {name, label, helpText, error, children} = this.props;
        const className = error ? 'form-group is-invalid' : 'form-group';

        return (
            <div className={className}>
                <label htmlFor={name}>{label}</label>
                {children}
                {error && <div className="invalid-feedback">{error}</div>}
                {helpText && <small className="form-text text-muted">{helpText}</small>}
            </div>
        )
    }
}

Field.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    helpText: PropTypes.string,
    error: PropTypes.string,
};

export class TextField extends Component {
    render() {
        const {name, label, placeholder, helpText, validate, asyncValidate, formApi} = this.props;
        const error = formApi.errors && formApi.errors[name];
        const asyncError = formApi.asyncErrors && formApi.asyncErrors[name];
        const anyErrors = error || asyncError;
        const className = anyErrors ? 'form-control is-invalid' : 'form-control';

        return (
            <Field name={name} label={label} helpText={helpText} error={anyErrors}>
                <Text field={name} id={name} className={className} validate={validate} asyncValidate={asyncValidate} placeholder={placeholder} />
            </Field>
        )
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
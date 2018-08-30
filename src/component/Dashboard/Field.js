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
        const {name, label, placeholder, helpText, validate, errors} = this.props;
        const error = errors && errors[name];
        const className = error ? 'form-control is-invalid' : 'form-control';

        return (
            <Field name={name} label={label} helpText={helpText} error={error}>
                <Text field={name} id={name} className={className} validate={validate} placeholder={placeholder} />
            </Field>
        )
    }
}

TextField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    helpText: PropTypes.string,
    errors: PropTypes.object,
    validate: PropTypes.func
};
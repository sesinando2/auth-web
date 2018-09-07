import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Field} from 'react-form'

export class FieldGroup extends Component {
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

FieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    helpText: PropTypes.string,
    error: PropTypes.string,
};

export class BaseField extends React.Component {

    getFieldProperties(formApi) {
        const {name, label, helpText} = this.props;
        const error = formApi.errors && formApi.errors[name];
        const asyncError = formApi.asyncErrors && formApi.asyncErrors[name];
        const anyErrors = error || asyncError;
        return {name, label, helpText, error: anyErrors}
    }

    renderFieldBody(baseProperties) {
        return null
    }

    render() {
        const {formApi} = this.props;
        const baseProperties = this.getFieldProperties(formApi);
        const fieldBody = this.renderFieldBody(baseProperties);
        console.log(formApi.getFormState());
        return (
            <FieldGroup {...baseProperties}>{fieldBody}</FieldGroup>
        )
    }
}

export class BaseCustomField extends React.Component {

    constructor(props) {
        super(props);
        this.renderCustomField = this.renderCustomField.bind(this);
    }

    getFieldProperties(formApi) {
        const {name, label, helpText} = this.props;
        const error = formApi.error;
        return {name, label, helpText, error}
    }

    renderCustomField(fieldApi) {
        const baseProperties = this.getFieldProperties(fieldApi);
        const fieldBody = this.renderFieldBody(fieldApi);
        return <FieldGroup {...baseProperties}>{fieldBody}</FieldGroup>
    }

    render() {
        const {name, validate, asyncValidate} = this.props;
        return <Field field={name} validate={validate} asyncValidate={asyncValidate}>{this.renderCustomField}</Field>
    }
}


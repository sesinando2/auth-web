import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Text, Field} from 'react-form'

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

class BaseField extends React.Component {

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
        return (
            <FieldGroup {...baseProperties}>{fieldBody}</FieldGroup>
        )
    }
}

export class TextField extends BaseField {

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

class BaseCustomField extends React.Component {

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

export class SelectField extends BaseCustomField {

    isSelected(fieldApi, option) {
        const {value} = fieldApi;
        return value && [].concat(...[value]).find((value) => value === option.value);
    }

    handleChanged(fieldApi, e) {
        const {multiple} = this.props;
        const {setValue} = fieldApi;

        if (!multiple) {
            setValue(e.target.value);
        } else {
            let values = [...e.target.options].filter((option) => option.selected).map((option) => option.value);
            setValue(values);
        }
    }

    renderOptions(fieldApi) {
        const {name, options} = this.props;
        return options.map((option) => {
            const key = `${name}-${option.value}`;
            const selected = this.isSelected(fieldApi, option);
            return <option value={option.value} key={key} selected={selected}>{option.label}</option>
        });
    }

    renderFieldBody(fieldApi) {
        const {field, multiple} = this.props;
        const {setTouched} = fieldApi;
        const className = fieldApi.error ? 'form-control is-invalid' : 'form-control';

        return (
            <select className={className}
                    multiple={multiple}
                    name={field}
                    onChange={(e) => this.handleChanged(fieldApi, e)}
                    onBlur={() => setTouched()}
            >{this.renderOptions(fieldApi)}</select>
        )
    }
}

SelectField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    helpText: PropTypes.string,
    validate: PropTypes.func,
    asyncValidate: PropTypes.func,

    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired
    })).isRequired,
    multiple: PropTypes.bool,
};
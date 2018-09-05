import React from 'react'
import {Form, Text} from 'react-form'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons'

import {BaseCustomField, FieldGroup} from './Base'

class ValueElement extends React.Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete() {
        const {value, onDelete} = this.props;
        onDelete(value);
    }

    render() {
        return (
            <a className="list-group-item list-group-item-action flex-column" onClick={this.delete}>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="text align-middle">{this.props.value}</div>

                    <FontAwesomeIcon className="text-muted" icon={faTimes} />
                </div>
            </a>
        )
    }
}

ValueElement.propTypes = {
    onDelete: PropTypes.func.isRequired,
    value: PropTypes.any
};

class AddInputElement extends React.Component {

    constructor(props) {
        super(props);
        this.validate = this.validate.bind(this);
        this.addValue = this.addValue.bind(this);
    }

    validate(value) {
        if (!value) {
            return {error: 'required'}
        }
    }

    addValue(formApi) {
        const {name, addValue} = this.props;
        const value = formApi.values[name];
        formApi.resetAll();
        addValue(value);
    }

    render() {
        return (
            <Form>
                { formApi =>
                    <div className="input-group">
                        <Text className="form-control" field={this.props.name} validate={this.validate} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button"
                                    disabled={!formApi.values[this.props.name]}
                                    onClick={() => this.addValue(formApi)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>
                }
            </Form>
        )
    }
}

AddInputElement.propTypes = {
    name: PropTypes.string.isRequired,
    addValue: PropTypes.func.isRequired
};

export default class MultiValuedTextField extends BaseCustomField {

    delete(fieldApi, valueToRemove) {
        const currentValue = fieldApi.value || [];
        fieldApi.setValue(currentValue.filter((value) => value !== valueToRemove));
    }

    addValue(fieldApi, valueToAdd) {
        const currentValue = fieldApi.value || [];
        fieldApi.setValue(currentValue.concat(valueToAdd));
    }

    renderCustomField(fieldApi) {
        const baseProperties = this.getFieldProperties(fieldApi);
        let values =  [].concat(...(fieldApi.value || []));

        let valuesElements = values.map((value) => {
            const key = `${fieldApi.fieldName}-${encodeURI(value)}`;
            return <ValueElement key={key} value={value} onDelete={(value) => this.delete(fieldApi, value)} />
        });

        return (
            <FieldGroup {...baseProperties}>
                <AddInputElement name="addValue" addValue={(value) => this.addValue(fieldApi, value)} />
                <ul className="list-group mt-2">
                    {valuesElements}
                </ul>
            </FieldGroup>
        )
    }
}
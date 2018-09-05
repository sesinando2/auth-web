import React from 'react'
import PropTypes from 'prop-types'
import {BaseCustomField} from './Base'

export default class SelectField extends BaseCustomField {

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
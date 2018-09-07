import React from 'react'
import PropTypes from 'prop-types'
import {BaseCustomField} from './Base'

class OptionElement extends React.Component {

    toggle() {
        const {toggle, value} = this.props;
        toggle(value);
    }

    render() {
        let classNames = 'list-group-item list-group-item-action';

        if (this.props.invalid) {
            classNames += ' list-group-item-danger';
        }

        if (this.props.selected) {
            classNames += ' list-group-item-info';
        }

        return (
            <button type="button" className={classNames} onClick={() => this.toggle()}>
                {this.props.label}
            </button>
        );
    }
}

OptionElement.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    toggle: PropTypes.func,
    onBlur: PropTypes.func,
    invalid: PropTypes.bool
};

export default class SelectField extends BaseCustomField {

    isSelectedValue(fieldApi, optionValue) {
        const {value} = fieldApi;
        return Boolean(value && [].concat(...[value]).find((value) => value === optionValue));
    }

    toggle(fieldApi, newValue) {
        const {multiple} = this.props;
        const {setValue} = fieldApi;

        if (!multiple) {
            setValue(newValue);
            fieldApi.setTouched();
        } else {
            this.toggleMulti(fieldApi, newValue);
        }
    }

    toggleMulti(fieldApi, toggleValue) {
        const {value, setValue} = fieldApi;
        let values = [].concat(...[value]);

        if (this.isSelectedValue(fieldApi, toggleValue)) {
            setValue(values.filter((value) => value !== toggleValue));
            fieldApi.setTouched();
        } else {
            setValue(values.concat(toggleValue));
            fieldApi.setTouched();
        }
    }

    renderOptions(fieldApi) {
        const {name, options} = this.props;
        const {setTouched, error} = fieldApi;

        return options.map((option) => {
            const key = `${name}-${option.value}`;
            const selected = this.isSelectedValue(fieldApi, option.value);
            return <OptionElement label={option.label} value={option.value}
                                 selected={selected} key={key}
                                 toggle={(value) => this.toggle(fieldApi, value)}
                                 onBlur={() => setTouched()} invalid={Boolean(error)} />
        });
    }

    renderFieldBody(fieldApi) {
        let className = 'list-group custom-control';

        if (fieldApi.error) {
            className += ' is-invalid';
        }

        return <ul className={className}>{this.renderOptions(fieldApi)}</ul>
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
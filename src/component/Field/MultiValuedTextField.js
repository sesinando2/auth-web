import React from 'react'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons'

import {BaseCustomField, FieldGroup} from './Base'

class ValueElement extends React.Component {

    constructor(props) {
        super(props);
        this.buttonElement = React.createRef();
        this.delete = this.delete.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    componentDidUpdate() {
        const {focused} = this.props;
        if (focused) {
            this.buttonElement.current.focus();
        }
    }

    delete() {
        const {value, onDelete} = this.props;
        onDelete(value);
    }

    handleKeyUp(e) {
        if (e.keyCode === 8) {
            this.delete();
        }
    }

    render() {
        return (
            <button type="button" className='list-group-item list-group-item-action' ref={this.buttonElement}
                    onClick={this.delete} onKeyUp={this.handleKeyUp} onBlur={this.props.onBlur}>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="text align-middle">{this.props.value}</div>

                    <FontAwesomeIcon className="text-muted" icon={faTimes} />
                </div>
            </button>
        )
    }
}

ValueElement.propTypes = {
    onDelete: PropTypes.func.isRequired,
    focused: PropTypes.bool,
    value: PropTypes.any,
    onBlur: PropTypes.func
};

class AddInputElement extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        this.textInput = React.createRef();
    }

    componentDidUpdate() {
        const {focused} = this.props;

        if (focused) {
            this.textInput.current.focus();
        }
    }

    addValue() {
        const {addValue} = this.props;
        const {value} = this.state;

        if (value.trim()) {
            addValue(this.state.value);
        }
        this.setState({value: ''});
    }

    handleKeyPress(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.addValue();
        }
    }

    render() {
        return (
            <div className="input-group">
                <input type="text" className="form-control"
                       placeholder={this.props.placeholder}
                       ref={this.textInput}
                       value={this.state.value}
                       onBlur={this.props.onBlur}
                       onChange={(e) => this.setState({value: e.target.value})}
                       onKeyDown={(e) => this.handleKeyPress(e)}/>

                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button"
                            disabled={!this.state.value.trim()}
                            onClick={() => this.addValue()}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
        )
    }
}

AddInputElement.propTypes = {
    name: PropTypes.string.isRequired,
    addValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    focused: PropTypes.bool,
    onBlur: PropTypes.func
};

export default class MultiValuedTextField extends BaseCustomField {

    constructor(props) {
        super(props);
        this.state = {
            focusOnAdd: false,
            focusOnFirst: false
        };
        this.addInputElement = React.createRef();
    }

    delete(fieldApi, valueToRemove) {
        const currentValue = fieldApi.value || [];
        const updatedValue = currentValue.filter((value) => value !== valueToRemove);
        fieldApi.setValue(updatedValue);

        if (updatedValue.length === 0) {
            this.setState({focusOnAdd: true, focusOnFirst: false});
        } else {
            this.setState({focusOnAdd: false, focusOnFirst: true});
        }
    }

    addValue(fieldApi, valueToAdd) {
        this.setState({focusOnFirst: false});
        const currentValue = fieldApi.value || [];
        if (currentValue.indexOf(valueToAdd) < 0) {
            fieldApi.setValue(currentValue.concat(valueToAdd));
        }
    }

    renderCustomField(fieldApi) {
        const baseProperties = this.getFieldProperties(fieldApi);
        let values =  [].concat(...(fieldApi.value || []));

        const valuesElements = values.map((value, index) => {
            const shouldFocus = this.state.focusOnFirst && index === 0;
            const key = `${fieldApi.fieldName}-${encodeURI(value)}`;
            return <ValueElement key={key} value={value} focused={shouldFocus}
                                 onDelete={(value) => this.delete(fieldApi, value)}
                                 onBlur={() => this.setState({focusOnFirst: false})} />
        });

        return (
            <FieldGroup {...baseProperties}>
                <AddInputElement name="addValue" placeholder={this.props.placeholder}
                                 ref={this.addInputElement} focused={this.state.focusOnAdd}
                                 addValue={(value) => this.addValue(fieldApi, value)}
                                 onBlur={() => this.setState({focusOnAdd: false})}/>

                <ul className="list-group mt-2">
                    {valuesElements}
                </ul>
            </FieldGroup>
        )
    }
}
import {
    CLEAR_FORM, RECEIVE_DELETE_CLIENT,
    RECEIVE_NEW_CLIENT,
    RECEIVE_UPDATE_CLIENT,
    RECEIVE_VALIDATE_CLIENT, REQUEST_DELETE_CLIENT,
    REQUEST_NEW_CLIENT,
    REQUEST_UPDATE_CLIENT,
    REQUEST_VALIDATE_CLIENT,
    SET_CLIENT,
    UPDATE_FORM
} from '../../actions/client/index';

export default function handleForm(state = {
    isValidating: false,
    isValidatingSince: null,
    isProcessing: false
}, action) {
    switch (action.type) {
        case REQUEST_VALIDATE_CLIENT:
            return Object.assign({}, state, {
                isValidating: true,
                isValidatingSince: action.requestedAt,
                errors: null
            });

        case RECEIVE_VALIDATE_CLIENT:
            if (state.isValidatingSince === action.requestedAt) {
                return Object.assign({}, state, {
                    isValidating: false,
                    isValidatingSince: null,
                    errors: Object.assign({}, getErrors(action.json))
                })
            }

            return state;

        case SET_CLIENT:
            return Object.assign({}, state, {
                current: action.id,
                isValidating: false,
                isValidatingSince: null,
                isProcessing: false,
                errors: null
            });

        case UPDATE_FORM:
            return Object.assign({}, state, {
                values: Object.assign({}, action.values)
            });

        case CLEAR_FORM:
            return Object.assign({}, state, {
                current: null,
                values: null,
                isValidating: false,
                isValidatingSince: null,
                isProcessing: false,
                errors: null
            });

        case REQUEST_UPDATE_CLIENT:
        case REQUEST_NEW_CLIENT:
        case REQUEST_DELETE_CLIENT:
            return Object.assign({}, state, {
                isProcessing: true,
                isValidating: true,
                isValidatingSince: null,
                errors: null
            });

        case RECEIVE_UPDATE_CLIENT:
        case RECEIVE_NEW_CLIENT:
        case RECEIVE_DELETE_CLIENT:
            return Object.assign({}, state, {
                isProcessing: false,
                isValidating: true
            });

        default:
            return state;
    }
}

function getErrors(json) {
    let errors = {};

    if (json && json.errors && json.errors.find((error) => error.code === 'uniqueConstraint.Client.clientId')) {
        errors['clientId'] = 'This Client ID has already been used.'
    }

    return errors;
}
import {
    CLEAR_FORM, EDIT_CLIENT, RECEIVE_UPDATE_CLIENT, REQUEST_UPDATE_CLIENT,
    UPDATE_FORM
} from '../../actions/client/index';
import {RECEIVE_VALIDATE_CLIENT, REQUEST_VALIDATE_CLIENT} from "../../actions/client/form";

export default function handleForm(state = {
    isValidating: false,
    isValidatingSince: null,
    isSaving: false
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

        case EDIT_CLIENT:
            return Object.assign({}, state, {
                current: action.id,
                values: Object.assign({}, action.client),
                isValidating: false,
                isValidatingSince: false,
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
                isValidatingSince: false,
                isSaving: false,
                errors: null
            });

        case REQUEST_UPDATE_CLIENT:
            return Object.assign({}, state, {
                isSaving: true
            });

        case RECEIVE_UPDATE_CLIENT:
            return Object.assign({}, state, {
                isSaving: false
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
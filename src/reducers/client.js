import {
    CLEAR_FORM,
    RECEIVE_CLIENT_LIST, RECEIVE_VALIDATE_CLIENT, REQUEST_CLIENT_LIST,
    REQUEST_VALIDATE_CLIENT, EDIT_CLIENT, UPDATE_FORM
} from '../actions/client'

export default function client(state = {
    isRequesting: false,
    didInvalidate: false,
    entities: {},
    form: {
        isValidating: false,
        isValidatingSince: null,
    }
}, action) {
    switch (action.type) {
        case REQUEST_CLIENT_LIST:
            return Object.assign({}, state, {
               isRequesting: true
            });

        case RECEIVE_CLIENT_LIST:
            let entities = createEntities(action.json);
            return Object.assign({}, state, {
                isRequesting: false,
                lastUpdated: action.receivedAt,
                form: Object.assign({}, state.form, {
                    values: Object.assign({}, entities[state.form.current])
                }),
                entities
            });

        case EDIT_CLIENT:
            action.client = state.entities[action.id];
            return Object.assign({}, state, {
                form: handleForm(state.form, action)
            });

        case CLEAR_FORM:
        case UPDATE_FORM:
        case REQUEST_VALIDATE_CLIENT:
        case RECEIVE_VALIDATE_CLIENT:
            return Object.assign({}, state, {
                form: handleForm(state.form, action)
            });

        default:
            return state;
    }
}

function handleForm(state, action) {
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
                errors: null
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

function createEntities(json) {
    return json.reduce((accumulator, client) => {
        accumulator[client.id] = client;
        return accumulator;
    }, {});
}
import {
    CLEAR_FORM,
    INVALIDATE_CLIENT_LIST,
    RECEIVE_CLIENT_LIST,
    RECEIVE_NEW_CLIENT,
    RECEIVE_UPDATE_CLIENT,
    RECEIVE_VALIDATE_CLIENT,
    REQUEST_CLIENT_LIST,
    REQUEST_NEW_CLIENT,
    REQUEST_UPDATE_CLIENT,
    REQUEST_VALIDATE_CLIENT,
    SET_CLIENT,
    UPDATE_FORM
} from '../../actions/client/index'
import handleForm from './form';

export default function client(state = {
    isRequesting: false,
    didInvalidate: false,
    entities: {},
    form: {
        isValidating: false,
        isValidatingSince: null,
        isSaving: false
    }
}, action) {
    switch (action.type) {
        case INVALIDATE_CLIENT_LIST:
            return Object.assign({}, state, {
                didInvalidate: true
            });

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

        case SET_CLIENT:
            action.client = state.entities[action.id];
            return Object.assign({}, state, {
                form: handleForm(state.form, action)
            });

        case RECEIVE_UPDATE_CLIENT:
        case RECEIVE_NEW_CLIENT:
            return Object.assign({}, state, {
                entities: Object.assign({}, state.entities, {
                    [action.json.id]: action.json
                }),
               form: handleForm(state.form, action)
            });

        // Form Operations
        case CLEAR_FORM:
        case UPDATE_FORM:
        case REQUEST_VALIDATE_CLIENT:
        case RECEIVE_VALIDATE_CLIENT:
        case REQUEST_UPDATE_CLIENT:
        case REQUEST_NEW_CLIENT:
            return Object.assign({}, state, {
                form: handleForm(state.form, action)
            });

        default:
            return state;
    }
}

function createEntities(json) {
    return json.reduce((accumulator, client) => {
        accumulator[client.id] = client;
        return accumulator;
    }, {});
}
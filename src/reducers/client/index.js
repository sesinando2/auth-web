import {
    CLEAR_FORM,
    RECEIVE_CLIENT_LIST, REQUEST_CLIENT_LIST, EDIT_CLIENT, UPDATE_FORM, RECEIVE_UPDATE_CLIENT, REQUEST_UPDATE_CLIENT,
    INVALIDATE_CLIENT_LIST
} from '../../actions/client/index'
import handleForm from './form';
import {RECEIVE_VALIDATE_CLIENT, REQUEST_VALIDATE_CLIENT} from "../../actions/client/form";

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

        case EDIT_CLIENT:
            action.client = state.entities[action.id];
            return Object.assign({}, state, {
                form: handleForm(state.form, action)
            });

        case RECEIVE_UPDATE_CLIENT:
            return Object.assign({}, state, {
                entities: Object.assign({}, state.entities, {
                    [action.clientId]: action.json
                }),
               form: handleForm(state.form, action)
            });

        // Form Operations
        case CLEAR_FORM:
        case UPDATE_FORM:
        case REQUEST_VALIDATE_CLIENT:
        case RECEIVE_VALIDATE_CLIENT:
        case REQUEST_UPDATE_CLIENT:
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
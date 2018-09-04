import {
    CLEAR_FORM,
    RECEIVE_CLIENT_LIST, RECEIVE_VALIDATE_CLIENT, REQUEST_CLIENT_LIST,
    REQUEST_VALIDATE_CLIENT, EDIT_CLIENT, UPDATE_FORM
} from '../../actions/client'
import handleForm from './form';

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



function createEntities(json) {
    return json.reduce((accumulator, client) => {
        accumulator[client.id] = client;
        return accumulator;
    }, {});
}
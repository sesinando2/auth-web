import {RECEIVE_CLIENT_LIST, REQUEST_CLIENT_LIST} from '../actions/client'

export default function client(state = {
    isRequesting: false,
    entities: {}
}, action) {
    switch (action.type) {
        case REQUEST_CLIENT_LIST:
            return Object.assign({}, state, {
               isRequesting: true
            });

        case RECEIVE_CLIENT_LIST:
            let entities = action.json.reduce((accumulator, client) => {
                accumulator[client.clientId] = client;
                return accumulator;
            }, {});

            return Object.assign({}, state, {
               isRequesting: false,
               entities
            });

        default:
            return state;
    }
}
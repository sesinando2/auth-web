import {REQUEST_TOKEN, RECEIVE_TOKEN, RETRIEVE_TOKEN, CLEAR_AUTHENTICATION} from '../actions/auth'

const ACCESS_TOKEN = 'access_token';
const TOKEN_TYPE = 'token_type';
const REFRESH_TOKEN = 'refresh_token';
const EXPIRES_IN = 'expires_in';
const SCOPE = 'scope';
const AUTHORITIES = 'authorities';

const TOKEN_PROPERTIES = [ACCESS_TOKEN, TOKEN_TYPE, REFRESH_TOKEN, EXPIRES_IN, SCOPE, AUTHORITIES];

function writeTokenDataToLocalStorage(json) {
    for (let prop in json) {
        localStorage.setItem(prop, json[prop]);
    }
}

function retrieveTokenData(action) {
    if (action.type === RECEIVE_TOKEN && action.json) {
        let json = action.json;
        writeTokenDataToLocalStorage(json);
        return json;
    }

    if (localStorage.getItem(ACCESS_TOKEN)) {
        return TOKEN_PROPERTIES.reduce((accumulator, prop) => {
            let value = localStorage.getItem(prop);
            if (value) {
                accumulator[prop] = value;
            }
            return accumulator;
        }, {});
    }
}

function authentication(state = {
    isAuthenticated: false,
    isExpired: false,
    isAuthenticating: false
}, action) {

    switch (action.type) {
        case REFRESH_TOKEN:
        case REQUEST_TOKEN:
            return Object.assign({}, state, {
                isAuthenticating: true
            });

        case RECEIVE_TOKEN:
        case RETRIEVE_TOKEN:
            let json = retrieveTokenData(action);

            if (json) {
                return Object.assign({}, state, {
                    isAuthenticating: false,
                    isAuthenticated: true,
                    lastUpdated: action.receivedAt,
                    token: json[ACCESS_TOKEN],
                    refreshToken: json[REFRESH_TOKEN],
                    data: json
                });
            }

            return state;

        case CLEAR_AUTHENTICATION:
            localStorage.clear();

            return {
                isAuthenticated: false,
                isExpired: false,
                isAuthenticating: false
            };

        default:
            return state;
    }
}

export default authentication;
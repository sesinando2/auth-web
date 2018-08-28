import fetch from 'cross-fetch'

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const RETRIEVE_TOKEN = 'RETRIEVE_TOKEN';
export const CLEAR_AUTHENTICATION = 'CLEAR_AUTHENTICATION';

export function getToken(authorizationCode) {
    return (dispatch) => {
        dispatch(requestToken(authorizationCode));
        return fetch(`http://localhost:10082/oauth/token`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${btoa(`admin:Urub42q9bCyFBP7B`)}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: buildRequestBody(authorizationCode)
        })
        .then(response => response.json(), error => console.log('An error occurred', error))
        .then(json => dispatch(receiveToken(json)))
    }
}

export function retrieveToken() {
    return {
        type: RETRIEVE_TOKEN
    }
}

export function clearAuthentication() {
    return {
        type: CLEAR_AUTHENTICATION
    }
}

function requestToken(authorizationCode) {
    return {
        type: REQUEST_TOKEN,
        authorizationCode
    }
}

function receiveToken(json) {
    return {
        type: RECEIVE_TOKEN,
        receivedAt: Date.now(),
        json
    }
}

function buildRequestBody(authorizationCode) {
    let body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', authorizationCode);
    body.set('client_id', 'admin');
    body.set('redirect_uri', 'http://localhost:3000');
    return body.toString()
}
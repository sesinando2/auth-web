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
            body: buildAuthCodeRequestBody(authorizationCode)
        })
        .then(response => response.json(), error => console.log('An error occurred', error))
        .then(json => dispatch(receiveToken(json)))
    }
}

export function authenticatedRequest(dispatch, getState, doRequest) {
    let {authentication} = getState();

    if (!authentication.isAuthenticated || !authentication.token) {
        return Promise.reject('Should be authenticated');
    }

    return doRequest(authentication).then((response) => {
        if (response && response.status === 401) {
            return dispatch(handle401());
        }

        return response;
    }, (error) => console.log('An error occurred', error));
}

export function handle401() {
    return (dispatch, getState) => {
        const {authentication} = getState();
        if (!authentication.isAuthenticated) {
            return Promise.resolve(dispatch(clearAuthentication()));
        } else if (authentication.refreshToken) {
            const token = authentication.refreshToken;
            dispatch(clearAuthentication());
            dispatch(refreshToken());
            return fetch(`http://localhost:10082/oauth/token`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${btoa(`admin:Urub42q9bCyFBP7B`)}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: buildRefreshTokenRequestBody(token)
            })
            .then(response => response.json(), error => console.log('An error occurred', error))
            .then(json => dispatch(receiveToken(json)))
        }
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

function refreshToken() {
    return {
        type: REFRESH_TOKEN
    }
}

function buildAuthCodeRequestBody(authorizationCode) {
    let body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', authorizationCode);
    body.set('client_id', 'admin');
    body.set('redirect_uri', 'http://localhost:3000');
    return body.toString();
}

function buildRefreshTokenRequestBody(refreshToken) {
    let body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', refreshToken);
    return body.toString();
}
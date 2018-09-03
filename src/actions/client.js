import fetch from 'cross-fetch'
import {handle401} from "./auth";

export const REQUEST_CLIENT_LIST = 'REQUEST_CLIENT_LIST';
export const RECEIVE_CLIENT_LIST = 'RECEIVE_CLIENT_LIST';

export const REQUEST_VALIDATE_CLIENT = 'REQUEST_VALIDATE_CLIENT';
export const RECEIVE_VALIDATE_CLIENT = 'RECEIVE_VALIDATE_CLIENT';

export const REQUEST_GET_CLIENT = 'REQUEST_GET_CLIENT';
export const RECEIVE_GET_CLIENT = 'RECEIVE_GET_CLIENT';

export const REQUEST_UPDATE_CLIENT = 'REQUEST_CLIENT_UPDATE';
export const RECEIVE_UPDATE_CLIENT = 'RECEIVE_CLIENT_UPDATE';

export const REQUEST_DELETE_CLIENT = 'REQUEST_DELETE_CLIENT';
export const RECEIVE_DELETE_CLIENT = 'RECEIVE_DELETE_CLIENT';

export const UPDATE_FORM = 'UPDATE_FORM';
export const EDIT_CLIENT = 'EDIT_CLIENT';
export const CLEAR_FORM = 'CLEAR_FORM';

export const CLIENT_URL = 'http://localhost:10082/api/client';

export function getClientList() {
    return (dispatch, getState) => {
        if (!shouldGetClientList(getState)) {
            return Promise.resolve();
        }

        return authenticatedRequest(dispatch, getState, (authentication) => {
            dispatch(requestClientList());
            return fetch(CLIENT_URL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authentication.token}`
                }
            })
        })
        .then((response) => response.json())
        .then((json) => dispatch(receiveClientList(json)))
    }
}

export function updateForm(values) {
    return (dispatch) => {
        dispatch(doUpdate(values));
        return dispatch(validate(values));
    }
}

export function editClient(id) {
    return {
        type: EDIT_CLIENT,
        id
    }
}

export function clearForm() {
    return {
        type: CLEAR_FORM
    }
}

function doUpdate(values) {
    return {
        type: UPDATE_FORM,
        values
    }
}

function requestClientList() {
    return {
        type: REQUEST_CLIENT_LIST,
    }
}

function receiveClientList(json) {
    return {
        type: RECEIVE_CLIENT_LIST,
        receivedAt: Date.now(),
        json
    }
}

function requestValidateClient(client, requestedAt) {
    return {
        type: REQUEST_VALIDATE_CLIENT,
        requestedAt, client
    }
}

function receiveValidateClient(json, requestedAt) {
    return {
        type: RECEIVE_VALIDATE_CLIENT,
        requestedAt, json
    }
}

function shouldGetClientList(getState) {
    const {client} = getState();

    if (Object.keys(client.entities).length === 0) {
        return true;
    } else if (client.isRequesting) {
        return false;
    } else {
        return client.didInvalidate;
    }
}

function authenticatedRequest(dispatch, getState, doRequest) {
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

function validate(values) {
    const requestedAt = new Date();
    return (dispatch, getState) => authenticatedRequest(dispatch, getState, (authentication) => {
        const {client} = getState();
        dispatch(requestValidateClient(values, requestedAt));
        let additionalPaths = [];

        if (client.form.current) {
            additionalPaths.push(client.form.current)
        }

        additionalPaths.push('validate');
        let url = `${CLIENT_URL}/${additionalPaths.join('/')}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authentication.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
    })
    .then((response) => {
        if (response.status === 400) {
            return response.json().then((json) => dispatch(receiveValidateClient(json, requestedAt)));
        } else {
            return dispatch(receiveValidateClient(null, requestedAt))
        }

    });
}
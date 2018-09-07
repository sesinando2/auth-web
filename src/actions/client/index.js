import fetch from 'cross-fetch'
import {authenticatedRequest} from "../auth";
import {receiveValidateClient} from "./form";

export const INVALIDATE_CLIENT_LIST = 'INVALIDATE_CLIENT_LIST';

export const REQUEST_CLIENT_LIST = 'REQUEST_CLIENT_LIST';
export const RECEIVE_CLIENT_LIST = 'RECEIVE_CLIENT_LIST';

export const REQUEST_GET_CLIENT = 'REQUEST_GET_CLIENT';
export const RECEIVE_GET_CLIENT = 'RECEIVE_GET_CLIENT';

export const REQUEST_UPDATE_CLIENT = 'REQUEST_UPDATE_CLIENT';
export const RECEIVE_UPDATE_CLIENT = 'RECEIVE_UPDATE_CLIENT';

export const REQUEST_NEW_CLIENT = 'REQUEST_NEW_CLIENT';
export const RECEIVE_NEW_CLIENT = 'RECEIVE_NEW_CLIENT';

export const REQUEST_DELETE_CLIENT = 'REQUEST_DELETE_CLIENT';
export const RECEIVE_DELETE_CLIENT = 'RECEIVE_DELETE_CLIENT';

export const REQUEST_VALIDATE_CLIENT = 'REQUEST_VALIDATE_CLIENT';
export const RECEIVE_VALIDATE_CLIENT = 'RECEIVE_VALIDATE_CLIENT';

export const UPDATE_FORM = 'UPDATE_FORM';
export const SET_CLIENT = 'SET_CLIENT';
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

export function updateClient(values) {
    const requestedAt = new Date();
    return (dispatch, getState) => {
        if (!shouldUpdateClient(getState)) {
            return Promise.resolve();
        }

        const {client} = getState();
        const clientId = client.form.current;

        return authenticatedRequest(dispatch, getState, (authentication) => {
            dispatch(requestUpdateClient(clientId, values, requestedAt));
            const url = `${CLIENT_URL}/${clientId}`;

            return fetch(url, {
                method: 'PUT',
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
            }

            return response.json();
        })
        .then((json) => dispatch(receiveUpdateClient(clientId, json)));
    }
}

export function createClient(values) {
    const requestedAt = new Date();
    return (dispatch, getState) => {
        return authenticatedRequest(dispatch, getState, (authentication) => {
            dispatch(requestNewClient());

            return fetch(CLIENT_URL, {
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
            }

            return response.json();
        })
        .then((json) => dispatch(receiveNewClient(json)));
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

function requestUpdateClient(clientId, values, requestedAt) {
    return {
        type: REQUEST_UPDATE_CLIENT,
        clientId, values, requestedAt
    }
}

function receiveUpdateClient(clientId, json) {
    return {
        type: RECEIVE_UPDATE_CLIENT,
        clientId, json
    }
}

function requestNewClient(clientId, values, requestedAt) {
    return {
        type: REQUEST_NEW_CLIENT,
        clientId, values, requestedAt
    }
}

function receiveNewClient(json) {
    return {
        type: RECEIVE_NEW_CLIENT,
        json
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

function shouldUpdateClient(getState) {
    const {client} = getState();

    if (client.form.isSaving) {
        return false;
    } if (client.form.errors && Object(client.form.errors).length > 0) {
        return false;
    } if (!client.form.current) {
        return false
    } else {
        return true;
    }
}
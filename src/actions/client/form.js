import {CLIENT_URL} from "./index";
import {authenticatedRequest} from "../auth";

export const REQUEST_VALIDATE_CLIENT = 'REQUEST_VALIDATE_CLIENT';
export const RECEIVE_VALIDATE_CLIENT = 'RECEIVE_VALIDATE_CLIENT';

export const UPDATE_FORM = 'UPDATE_FORM';
export const EDIT_CLIENT = 'EDIT_CLIENT';
export const CLEAR_FORM = 'CLEAR_FORM';

export function editClient(id) {
    return {
        type: EDIT_CLIENT,
        id
    }
}

export function updateForm(values) {
    return (dispatch) => {
        dispatch(doUpdate(values));
        return dispatch(validate(values));
    }
}

export function clearForm() {
    return {
        type: CLEAR_FORM
    }
}

export function requestValidateClient(client, requestedAt) {
    return {
        type: REQUEST_VALIDATE_CLIENT,
        requestedAt, client
    }
}

export function receiveValidateClient(json, requestedAt) {
    return {
        type: RECEIVE_VALIDATE_CLIENT,
        requestedAt, json
    }
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
            return dispatch(receiveValidateClient(null, requestedAt));
        }

    });
}

function doUpdate(values) {
    return {
        type: UPDATE_FORM,
        values
    }
}
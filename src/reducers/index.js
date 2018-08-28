import {combineReducers} from 'redux'
import authentication from './auth'
import client from './client'

const rootReducer = combineReducers({
    authentication, client
});

export default rootReducer
import {combineReducers} from 'redux'
import authentication from './auth'
import client from './client/index'

const rootReducer = combineReducers({
    authentication, client
});

export default rootReducer
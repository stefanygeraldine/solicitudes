import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducer = (state, action) => {

    if (action.type === 'UPDATE_VALIDATION') {
        return {
            ...state,
            validation: action.validation
        }
    }
    if (action.type === 'UPDATE_REQUESTS') {
        return {
            ...state,
            requests: action.requests
        }
    }
    if (action.type === 'UPDATE_VALIDATION_REQUEST') {
        return {
            ...state,
            validationRequest: action.validationRequest
        }
    }
    if (action.type === 'GENERATE_REQUEST') {
        return {
            ...state,
            requests: state.requests.concat(action.requests)
        }
    }
    if (action.type === 'APPROVE_REQUEST') {
        return {
            ...state,
            approve: state.approve.concat(action.approve)
        }
    }

    if (action.type === 'IF_DISABLED') {
        return {
            ...state,
            disabled: action.disabled
        }
    }
    if (action.type === 'SHOW_CONFIRM') {
        return {
            ...state,
            confirm: action.confirm
        }
    }
    if (action.type === 'SHOW_MODAL') {
        return {
            ...state,
            modal: action.modal
        }
    }
    if (action.type === 'TEMPORAL_REQUESTS') {
        return {
            ...state,
            temporal: action.temporal
        }
    }
    return state;
}

export default createStore(reducer, { modal: false, temporal: [], confirm: false, requests: [], approve: [], validation: {}, validationRequest: {}, disabled: true }, applyMiddleware(thunk));
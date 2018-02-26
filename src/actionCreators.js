import store from './store';

import { REQUESTS, VARS_FORM, ERROR_VARS_FORM, VARS_FORM_REQUEST, ERROR_FORM_REQUEST } from './static/dataMapping';

import history from './histrory';

var ERRORS = {
    ...ERROR_VARS_FORM
};
var ERRORS_REQUEST = {
    ...ERROR_FORM_REQUEST
};



//******************************************************************************
//******************FUNCIONES AUXILIARES****************************************
//******************************************************************************
let validateName = (inputValue) => {
    let isError = false;
    ERRORS = {
        ...ERROR_VARS_FORM
    };

    if (inputValue.name === '') {
        isError = true;
        ERRORS.nameError = "Ingresa tu nombre";
    }

    return isError;
}

let validateRequestFunction = (inputValue) => {
    let isError = false;
    ERRORS_REQUEST = {
        ...ERROR_FORM_REQUEST
    };

    if (inputValue.razonSocial === '') {
        isError = true;
        ERRORS_REQUEST.razonSocialError = "Ingresar razón social";
    }
    if (inputValue.numeroCuit === '') {
        isError = true;
        ERRORS_REQUEST.numeroCuitError = "Ingresar número de CUIT";
    }
    if (inputValue.numeroEstablecimiento === '') {
        isError = true;
        ERRORS_REQUEST.numeroEstablecimientoError = "Ingresar número de establecimiento";
    }
    return isError;
}


//******************************************************************************
//******************ACTIONS*****************************************************
//******************************************************************************


const ONCHANGE = (event, validation) => {

    let item = {
        name: event.target.value
    };

    let validateNewValue = {...validation, ...item };
    store.dispatch({
        type: 'UPDATE_VALIDATION',
        validation: validateNewValue
    });
}

const ONCHANGE_REQUEST = (event, validation) => {

    let item_name = event.target.name;
    let item_value = event.target.value;
    let item = {
        [item_name]: item_value
    };

    let validateNewValue = {...validation, ...item };

    store.dispatch({
        type: 'UPDATE_VALIDATION_REQUEST',
        validationRequest: validateNewValue
    });
}
const ONCHANGE_TERMINAL = (event, request, index) => {

    let terminal = event.target.value;
    let approve;
    if (terminal !== '') {
        approve = false;
    } else {
        approve = true;
    }
    let myrequest = {...request, terminal, approve };
    const newRequests = [...store.getState().requests.slice(0, index), myrequest, ...store.getState().requests.slice(index + 1), ];

    store.dispatch({
        type: 'UPDATE_REQUESTS',
        requests: newRequests
    });

}
const keyPress = (item, index, event) => {

    return dispatch => {
        if (event.key === 'Enter') {
            store.dispatch(approveRequest(item, index, event));
        }
    }
}

const approveRequest = (request, index, e) => {
    return dispatch => {
        let approveClass = true;
        let myrequest = {...request, approveClass };
        const newRequests1 = [...store.getState().requests.slice(0, index), myrequest, ...store.getState().requests.slice(index + 1), ];

        store.dispatch({
            type: 'UPDATE_REQUESTS',
            requests: newRequests1
        });


        let newRequests = [];
        store.getState().requests.map((item, key) => {

            if (key !== index) {
                newRequests.push(item);
            }
            return item;

        })

        setTimeout(() => {
            dispatch({
                type: 'UPDATE_REQUESTS',
                requests: newRequests
            })
        }, 1000)



        dispatch({
            type: 'ADD_REQUEST',
            approve: request
        })
    }
}


const cancelRequest = () => {

    return dispatch => {
        let rejectClass = true;
        let requests = store.getState().requests;
        let index = store.getState().temporal;
        let myrequest = {...requests[index], rejectClass };
        const newRequests1 = [...requests.slice(0, index), myrequest, ...requests.slice(index + 1), ];

        store.dispatch({
            type: 'UPDATE_REQUESTS',
            requests: newRequests1
        });

        let newRequests = [];
        requests.map((item, key) => {

            if (key !== index) {
                newRequests.push(item);
            }
            return item;

        })
        dispatch({
            type: 'SHOW_CONFIRM',
            confirm: false
        })


        setTimeout(() => {
            dispatch({
                type: 'UPDATE_REQUESTS',
                requests: newRequests
            })
        }, 1000)

    }
}

const initializateValidation = () => {
    const VALIDATION = {
        change: ONCHANGE,
        ...VARS_FORM,
        ...ERROR_VARS_FORM
    };
    return {
        type: 'UPDATE_VALIDATION',
        validation: VALIDATION
    };
}
const initializateValidationRequest = () => {
    const VALIDATION = {
        changeRequest: ONCHANGE_REQUEST,
        ...VARS_FORM_REQUEST,
        ...ERROR_FORM_REQUEST
    };
    return {
        type: 'UPDATE_VALIDATION_REQUEST',
        validationRequest: VALIDATION
    };
}


const showConfirm = (bolean) => {
    return ({
        type: 'SHOW_CONFIRM',
        confirm: bolean
    });

}
const showModal = (bolean) => {
    return ({
        type: 'SHOW_MODAL',
        modal: bolean
    });

}


const temporalReject = (request) => {
    let temporalRequest = request

    return ({
        type: 'TEMPORAL_REQUESTS',
        temporal: temporalRequest
    });

}

const initializateRequests = () => {
    let myrequests = [
        ...REQUESTS
    ]
    myrequests.map((item, index) => {
        item.change = ONCHANGE_TERMINAL;
        return item
    })
    return ({
        type: 'UPDATE_REQUESTS',
        requests: myrequests
    });

}

const updateMessage = (validation) => {
    return dispatch => {
        if (!validateName(validation)) {
            dispatch({
                type: 'IF_DISABLED',
                disabled: false
            })

            dispatch({
                    type: 'UPDATE_PEOPLE',
                    user: validation.name
                })
                //CLEAR LABELS
            let labelMessage = {
                ...validation,
                ...ERROR_VARS_FORM,
            };

            dispatch({
                type: 'UPDATE_VALIDATION',
                validation: labelMessage
            })


        } else {

            const VALIDATION = {
                ...validation,
                ...ERRORS
            };

            dispatch({
                type: 'UPDATE_VALIDATION',
                validation: VALIDATION
            })
        }
    }
}


const generateRequest = (validation) => {
    return dispatch => {

        if (!validateRequestFunction(validation)) {
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            let today = day + '/' + month + '/' + year;

            let REQUEST = {
                ...validation,
                approve: true,
                approveClass: false,
                reject: false,
                rejectClass: false,
                date: today,
                change: ONCHANGE_TERMINAL

            }

            dispatch({
                type: 'GENERATE_REQUEST',
                requests: REQUEST
            })

            const VALIDATION = {
                ...VARS_FORM_REQUEST,
                ...ERROR_FORM_REQUEST,
                changeRequest: ONCHANGE_REQUEST,
            };
            dispatch({
                type: 'UPDATE_VALIDATION_REQUEST',
                validationRequest: VALIDATION
            })
            if (store.getState().modal) {
                dispatch({
                    type: 'SHOW_MODAL',
                    modal: false
                })
            } else {
                history.push('/solicitudes');
            }

        } else {

            const VALIDATION = {
                ...validation,
                ...ERRORS_REQUEST
            };
            dispatch({
                type: 'UPDATE_VALIDATION_REQUEST',
                validationRequest: VALIDATION
            })
        }
    }
}

export {
    updateMessage,
    generateRequest,
    initializateRequests,
    initializateValidation,
    approveRequest,
    initializateValidationRequest,
    showConfirm,
    showModal,
    cancelRequest,
    temporalReject,
    keyPress
};
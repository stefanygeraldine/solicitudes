import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { Provider } from 'react-redux';
import { initializateValidation } from './actionCreators';
import { initializateValidationRequest } from './actionCreators';
import { initializateRequests } from './actionCreators';

store.dispatch(initializateValidation());
store.dispatch(initializateValidationRequest());
store.dispatch(initializateRequests());
ReactDOM.render(
    
        <Provider store={store} >
            <App />
        </Provider>,
    
        document.getElementById('root'));
    registerServiceWorker();
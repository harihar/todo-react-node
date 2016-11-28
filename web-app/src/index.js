import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducer";
import {TodoAppContainer} from "./components/TodoApp";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";

const client = axios.create({
    responseType: 'json'
});

// const createStoreDevTools = compose(
//     window.devToolsExtension ? window.devToolsExtension() : f => f
// )(createStore);
// const store = createStoreDevTools(reducer, Map(), applyMiddleware(ReduxThunk, dataService));
//
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, Map(), composeEnhancers(
//     applyMiddleware(ReduxThunk, dataService)
// ));

let store = createStore(
    reducer,
    applyMiddleware(
        axiosMiddleware(client), //second parameter options can optionally contain onSuccess, onError, onComplete, successSuffix, errorSuffix
    )
);

require('../../node_modules/todomvc-app-css/index.css');

ReactDOM.render(
    // We wrap our app in a Provider component to pass the store down to the components
    <Provider store={store}>
        <TodoAppContainer />
    </Provider>,
    document.getElementById('app')
);

store.dispatch({
    type: 'LOAD',
    payload: {
        request: {
            url: '/todo'
        }
    }
});

// if (module.hot) {
//     module.hot.accept();
// }
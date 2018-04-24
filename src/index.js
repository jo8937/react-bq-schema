	import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/static/css/font-awesome.min.css';
import './styles/scss/index.scss';

import {  combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'; 
import {  loadingBarMiddleware, loadingBarReducer } from 'react-redux-loading-bar'
import logger from 'redux-logger'

const counterReducer = (state = {
	value: 0
}, action) => {
	console.log(action);
	return state;
};

const reducer = combineReducers({
		loadingBar: loadingBarReducer,
		test: counterReducer
  })

const customMiddleWare = store => next => action => {
	console.log("Middleware triggered:", action);
	
	next(action);
}

const createStoreWithMiddleware = compose(
  applyMiddleware(
		loadingBarMiddleware(), // manages loading bar
		logger,
		customMiddleWare
  ),
)(createStore)

const store = createStoreWithMiddleware(reducer)

ReactDOM.render(
	<Provider store={store}>
    <App />
  </Provider>
		, document.getElementById('root'));
registerServiceWorker();

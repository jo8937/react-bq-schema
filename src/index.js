import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/static/css/font-awesome.min.css';
import './styles/scss/index.scss';

import {  combineReducers, createStore, applyMiddleware  } from 'redux'
import {  loadingBarMiddleware, loadingBarReducer } from 'react-redux-loading-bar'

const reducer = combineReducers({
    loadingBar: loadingBarReducer,
  })

const store = createStore(
	reducer,
	  applyMiddleware(
	  loadingBarMiddleware()
	  )
);


ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();

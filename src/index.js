import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/static/css/font-awesome.min.css';
import './styles/scss/index.scss';
import { createStore, applyMiddleware } from 'redux'
import {  loadingBarMiddleware , LoadingBar, loadingBarReducer } from 'react-redux-loading-bar'
import { combineReducers, dispatch } from 'redux'

const reducer = combineReducers({
  // app reducers
  loadingBar: loadingBarReducer,
})

const store = createStore(
  reducer,
	applyMiddleware(
    loadingBarMiddleware({
      promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
		})
	)
)

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();

import React, { Component } from 'react';
import {  combineReducers, createStore, applyMiddleware, compose } from 'redux'

import {  loadingBarMiddleware, loadingBarReducer } from 'react-redux-loading-bar'
import logger from 'redux-logger'


import rootReducer from './ReduxReducer'

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

const store = createStoreWithMiddleware(rootReducer)

export default store
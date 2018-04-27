import React, { Component } from 'react';
import {  combineReducers, createStore, applyMiddleware, compose } from 'redux'

import {  loadingBarMiddleware, loadingBarReducer } from 'react-redux-loading-bar'
import logger from 'redux-logger'

import { addLocaleData } from 'react-intl'
import koLocaleData from 'react-intl/locale-data/ko'
import enLocaleData from 'react-intl/locale-data/en'
import zhLocaleData from 'react-intl/locale-data/zh'
import jaLocaleData from 'react-intl/locale-data/ja'
import rootReducer from './ReduxReducer'
import { composeWithDevTools } from 'redux-devtools-extension';

addLocaleData([...koLocaleData, ...enLocaleData, ...jaLocaleData, ...zhLocaleData])

const customMiddleWare = store => next => action => {
	console.log("Middleware triggered:", action);
	next(action);
}

const initialState = {}

const store = createStore(rootReducer, initialState,
	composeWithDevTools(
		applyMiddleware(
			logger,
			customMiddleWare,
			loadingBarMiddleware(), 
		)
	)
)

export default store
import React, { Component } from 'react';
import {  combineReducers, createStore, applyMiddleware, compose } from 'redux'

import {  loadingBarMiddleware, loadingBarReducer } from 'react-redux-loading-bar'
import logger from 'redux-logger'

import { addLocaleData } from 'react-intl'
import koLocaleData from 'react-intl/locale-data/ko'
import enLocaleData from 'react-intl/locale-data/en'
import zhLocaleData from 'react-intl/locale-data/zh'
import jaLocaleData from 'react-intl/locale-data/ja'
import ReduxThunk from 'redux-thunk'
import rootReducer from './ReduxReducer'
import { composeWithDevTools } from 'redux-devtools-extension';

import locales from './locale'
import CustomUtils from './custom-utils'

import createSagaMiddleware from 'redux-saga'
import rootSaga from './ReduxSaga'


var initialLocale = CustomUtils.getLocale();

addLocaleData([...koLocaleData, ...enLocaleData, ...jaLocaleData, ...zhLocaleData])

const customMiddleWare = store => next => action => {
	console.log("Middleware triggered:", action);
	next(action);
}

const initialState = {
	intl: {
		locale: initialLocale,
		messages : locales[initialLocale]
	}
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, initialState,
	composeWithDevTools(
		applyMiddleware(
			logger,
			ReduxThunk,
			sagaMiddleware,
			customMiddleWare,
			loadingBarMiddleware(), 
		)
	)
)

store.runSaga = sagaMiddleware.run;
store.runSaga(rootSaga);

export default store
import React, { Component } from 'react';
import {  combineReducers, createStore, applyMiddleware, compose } from 'redux'

import {  loadingBarMiddleware, loadingBarReducer } from 'react-redux-loading-bar'
import logger from 'redux-logger'

import { addLocaleData, FormattedMessage } from 'react-intl'
import koLocaleData from 'react-intl/locale-data/ko'
import enLocaleData from 'react-intl/locale-data/en'
import zhLocaleData from 'react-intl/locale-data/zh'
import jaLocaleData from 'react-intl/locale-data/ja'
import rootReducer from './ReduxReducer'

addLocaleData([...enLocaleData, ...koLocaleData, ...jaLocaleData, ...zhLocaleData])

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

const initialState = {
	intl: {
	  defaultLocale: 'ko',
	  locale: 'ko',
	  messages: {
			'schema_view.use_select.select': '선택',
			'schema_view.use_select.required': '필수',
			'schema_view.use_select.recommend': '권장',
	  },
	},
}

const store = createStoreWithMiddleware(rootReducer, initialState)

export default store
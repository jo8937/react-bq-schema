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

import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'

import { locales } from '../locales'
import CustomUtils from '../utils/custom-utils'

import rootReducer from './reducer'
import rootSaga from './saga'
import { toast  } from 'react-toastify';
import { RES_PATTERN, REQ_PATTERN } from './action'

var initialLocale = CustomUtils.getLocale();

addLocaleData([...koLocaleData, ...enLocaleData, ...jaLocaleData, ...zhLocaleData])

const customMiddleWare = store => next => action => {
	// ajax 요청 type 패턴이 오면 토스트 로딩 띄움
	if(action.type.match(REQ_PATTERN)){
		let actionTypeId = REQ_PATTERN.exec(action.type)[1];
		let message = action.type;
		let intl = store.getState().intl;
		let toastId = null;
		if(intl && intl.messages["loading."+actionTypeId.toLowerCase()]){
			message = intl.messages["loading."+actionTypeId.toLowerCase()];
			toastId = toast(message);
		}
		store.dispatch({
			type: "SAVE_TOAST_ID",
			actionTypeId: actionTypeId,
			toastId : toastId
		})
	// ajax 응답 type 이 오면... 토스트 로딩 지음
	}else if(action.type.match(RES_PATTERN)){
		let actionTypeId = RES_PATTERN.exec(action.type)[1];
		let ls = store.getState().loadingStatus;
		if (ls && ls[actionTypeId] && ls[actionTypeId].toastId){
			toast.dismiss(ls[actionTypeId].toastId);
		};
		store.dispatch({
			type: "DELETE_TOAST_ID",
			actionTypeId: actionTypeId
		})
		
	}else if(action.type == "SHOW_TOAST"){
		//toast(action.message, action.options);
	}

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
			//logger,
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
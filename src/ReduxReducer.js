import React, { Component } from 'react';
import {  combineReducers, createStore, applyMiddleware, compose } from 'redux'
import {  loadingBarMiddleware, loadingBarReducer } from 'react-redux-loading-bar'
import logger from 'redux-logger'
import { Provider, intlReducer } from 'react-intl-redux'

const debuggerReducer = (state = {}, action) => {
	//console.log(action);
	return state;
};

const schemaReducer = (state = { schema: null, fields: null } , action) => {
	console.log(action.payload);
    switch(action.type){
		case 'SCHEMA_FULFILLED':
			var newState = Object.assign({}, state, {
				schema: action.schema,
				fields: action.fields
			});
			return newState;
		case 'SCHEMA_UPDATE_FULFILLED':
            return Object.assign({}, state, {});
		default:
            return state;
    }
}

const rootReducer = combineReducers({
	loadingBar: loadingBarReducer,
	debugger: debuggerReducer,
	schemaVo : schemaReducer,
	intl: intlReducer
})

export default rootReducer
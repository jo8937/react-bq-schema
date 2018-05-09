import React, { Component } from 'react';
import {  combineReducers, createStore, applyMiddleware, compose } from 'redux'
import CustomUtils from './custom-utils'
import fetch from './cross-fetch-with-timeout';
import { fork, call, put, takeLatest, take } from 'redux-saga/effects'

import createSagaMiddleware from 'redux-saga'
import * as effects from 'redux-saga/effects'
import 'babel-polyfill'
import createCombineLatest from 'redux-saga-combine-latest'

const combineLatest = createCombineLatest(effects)

function* fetchSchemaToSourceGenerating(actions) {
	try {
	  //const user = yield call(Api.fetchUser, action.payload.userId);
		yield put({type: "SOURCE_PENDING"});
		let res = yield call(fetch, CustomUtils.SOURCE_URI,{
															method: 'POST',
															headers:
															{
																'Content-type': 'application/x-www-form-urlencoded'
															},
															body: CustomUtils.formData({ category: actions[0].schema.category, lang:actions[1].lang }),
															timeout:3000
														}
							);
		yield put({
					type: "SOURCE_FULFILLED",
					source: res.source
				  });
	} catch (e) {
		yield put({type: "SOURCE_REJECTED", message: e.message});
		yield put({type: "ALERT_MESSAGE", msgIdTitle: "label.need_login", message: e.message});
	}
}

function* sourgeGeneratorSagaWait() {
	//yield takeLatest(["SCHEMA_FULFILLED","REQUEST_SOURCE"], fetchSchemaToSourceGenerating);
	yield combineLatest(["SCHEMA_FULFILLED","REQUEST_SOURCE"], fetchSchemaToSourceGenerating);
}
  
export default function* rootSaga() {
    yield [
        fork(sourgeGeneratorSagaWait)
    ];
}

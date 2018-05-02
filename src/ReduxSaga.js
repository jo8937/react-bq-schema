import React, { Component } from 'react';
import {  combineReducers, createStore, applyMiddleware, compose } from 'redux'
import CustomUtils from './custom-utils'
import { call, put, takeLatest } from 'redux-saga/effects'


// worker Saga: USER_FETCH_REQUESTED 액션에 대해 호출될 것입니다
function* fetchData(action) {
try {
	//const user = yield call(Api.fetchUser, action.payload.userId);
	yield put({type: "SAGA_PENDING", act: new Promise((resolve,reject) =>
		{
			console.log("----==================");
			console.log(action);
		}	
  	)});
} catch (e) {
	yield put({type: "SAGA_ERROR", message: e.message});
}
}

function* mySaga() {
	yield takeLatest("SCHEMA_FULFILLED", fetchData);
}

export default mySaga;
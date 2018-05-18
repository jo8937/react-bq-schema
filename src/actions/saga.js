import React, { Component } from "react";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { fork, call, put, takeLatest, take, select } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import * as effects from "redux-saga/effects";
import "babel-polyfill";
import createCombineLatest from "redux-saga-combine-latest";

import API from "./API";
import CustomUtils from "../utils/custom-utils";
import fetch from "../utils/cross-fetch-with-timeout";

const combineLatest = createCombineLatest(effects);

function* fetchSaga(actions, actionName, options) {
	const actionType = actionName ? actionName : actions.type;
	const URI = API[actionName+"_URI"];

    try {
		if(!URI){
			throw new Error(`[${actionName}] Not exists in request URI`);
		}
        //const user = yield call(Api.fetchUser, action.payload.userId);
        yield put({ type: actionType + "_PENDING" });
        let res = yield call(fetch, URI, options);
        yield put({
            type: actionType + "_FULFILLED",
            req: actions,
            res
        });
        return res;
    } catch (e) {
        // Bad response from server : 405
        console.log(e);
        if (e.message.match(/Network request failed/g)) {
            
            let loginCheckSuccess = yield call(fetchLoginCheck);
            // network fail but login is ok... 
            if(loginCheckSuccess === true){
                yield put({ type: actionType + "_REJECTED", message: e.message });
            }else{
                yield put({
                    type: "ALERT_MESSAGE",
                    msgIdTitle: "label.need_login",
                    message: e.message
                });
            }

        } else {
            yield put({ type: actionType + "_REJECTED", message: e.message });
        }
    }
}

function* fetchLoginCheck() {
    try{
        let resLoginCheck = yield call(fetch, API.LOGIN_CHECK_URI);
        return resLoginCheck.success;
    }catch(e){
        console.log(e);
        return false;
    }
}
/*
  static SCHEMA_URI = APP_URI['BASE_URI'] + "/schema/view/" + APP_URI['BASE_CATEGORY'] + ".json";
  static SOURCE_URI = APP_URI['BASE_URI'] + "/schema/generate_source.json";
  static DATA_URI = APP_URI['BASE_URI'] + "/tabledata/" + APP_URI['BASE_CATEGORY'] + ".json";
  static SCHEMA_EDIT_URI = APP_URI['BASE_URI'] + "/schema/schema_edit_proc";
  static FIELD_ACTIVE_URI = APP_URI['BASE_URI'] + "/field/active";
  static FIELD_EDIT_URI = APP_URI['BASE_URI'] + "/schema/field_edit_proc";
  static FIELD_ADD_URI = APP_URI['BASE_URI'] + "/schema/field_add_proc";
*/
class Sagas{

    static *fetch_datalist_with_schema(actions) {
        let res = yield call(fetchSaga, actions, "DATALIST",  {
            body: JSON.stringify({
                category: actions[0].res.schema.category,
                ...actions[1]
            })
        });
    }

    static *fetch_source_with_schema(actions) {
        let res = yield call(fetchSaga, actions, "SOURCE",  {
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            },
            body: CustomUtils.formData({
                category: actions[0].res.schema.category,
                lang: actions[1].lang
            })
        });
    }

    static *fetch_schema(action){
        let res = yield call(fetchSaga, action, "SCHEMA", {
            method: "GET"
        });
    }

    static *fetch_schema_edit(action) {
        let res = yield call(fetchSaga, action, "SCHEMA_EDIT", {
            body: JSON.stringify( action.payload)
        });
    }
    
    static *fetch_field_add(action) {
        let res = yield call(fetchSaga, action, "FIELD_ADD", {
            body: JSON.stringify( action.payload)
        });
    }
    
    static *fetch_field_edit(action) {
        yield call(fetchSaga, action, "FIELD_EDIT",{
            body: JSON.stringify( action.payload)
        });


    }

    static *refresh_source_and_datas(actions){
        //let schema = actions[0]
        //let action = actions[1]
        let source = yield select(state => state.sourceGen)

        if(source){
            yield put({ type: "REQUEST_SOURCE", lang: source.lang })
        }
        
        //let dataPreview = yield select(state => state.dataPreview)
        //yield put({ type: "REQUEST_DATALIST", page: 1 })
    }

    static *show_long_wait(action){
        
    }
    static *hide_long_wait(action){
        
    }
}

function* fetch_command(action){
    let surfix = action.type.toLowerCase().replace(/request_(.+)/, "$1");
    let generator =  Sagas["fetch_"+surfix];
    if (generator){
        yield call(generator, action);
    }else{
        console.log("Generater not found in Sagas[fetch_"+surfix+"]");
    }
}

export default function* rootSaga() {
    yield [
		fork(function*(){
			yield takeLatest(action => action.type.match(/^REQUEST_/), fetch_command);
		}),
		fork(function*(){
			yield combineLatest(["SCHEMA_FULFILLED", "REQUEST_SOURCE"], Sagas.fetch_source_with_schema);
        }),
		fork(function*(){
			yield combineLatest(["SCHEMA_FULFILLED", "REQUEST_DATALIST"], Sagas.fetch_datalist_with_schema);
        }),
		fork(function*(){
			yield takeLatest(action => ["SCHEMA_EDIT_FULFILLED","FIELD_ADD_FULFILLED","FIELD_EDIT_FULFILLED"].includes(action.type), Sagas.refresh_source_and_datas);
        }),
		fork(function*(){
			yield takeLatest("REQUEST_FIELD_ADD", Sagas.show_long_wait);
        }),
		fork(function*(){
			yield takeLatest("FIELD_ADD_FULFILLED", Sagas.hide_long_wait);
        })
	];
}

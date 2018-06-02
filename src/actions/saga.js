import React, { Component } from "react";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { fork, call, put, takeLatest, take, select } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import * as effects from "redux-saga/effects";
import "babel-polyfill";
import createCombineLatest from "redux-saga-combine-latest";
import API from "./API";
import CustomUtils from "../utils/custom-utils";
import formetMessage from "../utils/custom-utils";
import fetch from "../utils/cross-fetch-with-timeout";
import * as defined_actions from "./action";

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
        if(res){
            yield put({
                type: actionType + "_FULFILLED",
                req: actions,
                res
            });
            if(res.success === false){
                yield put({ type: actionType + "_REJECTED", message: "["+URI+"] " + res.message });
            }
        }else{
            yield put({ type: actionType + "_REJECTED", message: "["+URI+"] response not found" });
        }
        
        return res;
    } catch (e) {
        console.log(e);
        // 인증이나 500 에러등 뭔가 응답이 있는 에러라면....
        if(e.status && e.body){
            let blobres = yield call(() => e.body);
            try{
                let jsonres = JSON.parse(blobres);
                if([401,405].includes(e.status)){
                    yield put({
                        type: "ALERT_MESSAGE",
                        msgIdTitle: "label.need_login",
                        message: "["+URI+" ("+e.status+")] " + "Login Required\r\n" + jsonres.message,
                        url: jsonres.url
                    });
                }else{
                    yield put({ type: actionType + "_REJECTED", message: "["+URI+" ("+e.status+")] " + jsonres.message });
                }
            }catch(e2){
                yield put({ type: actionType + "_REJECTED", message: "["+URI+" ("+e.status+")] " + e2.message + " : " + blobres });
            }
        // 타임아웃이라면.....
        }else if(e.timeout){
            yield put({ type: actionType + "_REJECTED", 
                        message: "[" + URI + "] 페이지 로딩이 너무 오래 걸리네요.\r\n잠시 후 다시 시도해보세요\r\n" + e.message + "\r\n"
                      });
        // 403 리다이랙트 등으로 브라우저에서 자체 발생시킨 에러 의 경우... 체크가 안되므로 String 으로 체크
        }else if (e.message.match(/Network request failed/g)) {
            // 리다이랙트 없는 로그인체크 ajax 호출을 한번 시도..
            let loginCheckSuccess = yield call(fetchLoginCheck);
            // 뭔가 에러난건 맞는데 로그인은 되어있는 상태라면....?
            if(loginCheckSuccess === true){
                // 그럼 그냥 에러..
                yield put({ type: actionType + "_REJECTED", message: "[" + URI + "] " + e.message });
            }else{
                // 로그인이 안되어있어서 에러난거면... 로그인 해주세요 추가.
                yield put({
                    type: "ALERT_MESSAGE",
                    msgIdTitle: "label.need_login",
                    message: "[" + URI + "] Login Required\r\n" + e.message,
                    url: API.CONSOLE_HOME
                });
            }

        } else {
            yield put({ type: actionType + "_REJECTED", message: "[" + URI + "] " + e.message });
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
function *sleep(time) {
    yield new Promise(resolve => setTimeout(resolve, time));
  }

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
            body: JSON.stringify( action.payload)
        });
        if(res){
            yield put( defined_actions.requestBigquerySchema(res.schema.category) );
	    }
    }

    static *fetch_bigquery_schema(action){
        let res = yield call(fetchSaga, action, "BIGQUERY_SCHEMA", {
            body: JSON.stringify( action.payload)
        });
        if(res){
            yield put( defined_actions.requestSchemaList() );
	    }
    }

    static *fetch_schema_edit(action) {
        let res = yield call(fetchSaga, action, "SCHEMA_EDIT", {
            body: JSON.stringify( action.payload)
        });
    }
    
    static *wait_schema_and_fetch_schema_list(actions) {
        let res = yield call(fetchSaga, actions[1], "SCHEMA_LIST", {
            body: JSON.stringify( actions[1].payload)
        });
    }

    static *fetch_field_add(action) {
        let res = yield call(fetchSaga, action, "FIELD_ADD", {
            body: JSON.stringify( action.payload)
        });
        yield put( defined_actions.requestBigquerySchema() );
    }
    
    static *fetch_field_edit(action) {
        yield call(fetchSaga, action, "FIELD_EDIT",{
            body: JSON.stringify( action.payload)
        });
    }

    static *fetch_etl_send(action) {
        yield call(fetchSaga, action, "ETL_SEND",{
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

    static *waiting_for_bigquery(action){

        let reqParam = {
            category: API.CATEGORY,
        }
        let datalistParam = {};
        try{ 
            reqParam["guid"] = action.res.data.logBody[0].guid; 
            //datalistParam = { k:"guid", m:"EQUAL", v:action.res.data.logBody[0].guid };
        }catch(e){}
        try{ reqParam["dataset"] = API.INIT_PARAM["dataset"].trim(); }catch(e){}
        
        for(let i=0; i < 10; i++){
            let res = yield call(fetchSaga, action, "ETL_MONITOR",{
                body: JSON.stringify(reqParam)
            });
            if(res && res.status && res.status.bigquery){
                yield put(defined_actions.requestDataListAction(datalistParam));
                try{
                    window.location.href = "#dataPreviewArea";
                }catch(eee){}
                return true;
            }
            if(res && res.success === false){
                yield put({ type:"ETL_MONITOR_ERROR" });
                return false;
            }
            if(!res){
                yield put({ type:"ETL_MONITOR_ERROR" });
                return false;
            }

            yield call(sleep, 3000);
        }
        return false;
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
			yield takeLatest("ETL_SEND_FULFILLED", Sagas.waiting_for_bigquery);
        }),
		fork(function*(){
			yield combineLatest(["SCHEMA_FULFILLED", "REQUEST_SCHEMA_LIST"], Sagas.wait_schema_and_fetch_schema_list);
        }),
	];
}
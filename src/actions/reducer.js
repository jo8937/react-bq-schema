import React, { Component } from "react";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import {
    loadingBarMiddleware,
    loadingBarReducer
} from "react-redux-loading-bar";
import logger from "redux-logger";
import { Provider, intlReducer } from "react-intl-redux";
import { RES_PATTERN, REQ_PATTERN } from './action'
import { toast  } from 'react-toastify';

const initParamReducer = (state = { category:"", gameGroup:"" }, action) => {
    switch (action.type) {
        case "INIT_PARAM":
            return Object.assign({}, state, action.res);
        default:
            return state;
    }
};

const loadingStatusRecuder = (state = { }, action) => {
    switch(action.type){
        case "SAVE_TOAST_ID":
            return Object.assign({}, state, { [action.actionTypeId] : { status: "LOADING", toastId: action.toastId } });
        case "DELETE_TOAST_ID":
            return Object.assign({}, state, { [action.actionTypeId] : { status: "FIN", toastId: null } });
        default:
            return state;
    }
};

const dataPreviewReducer = (state = { dataList:[], paging:{totalData:0,page:1}, param:{k:"",m:"",v:""}, extendColList: [] }, action) => {
    switch (action.type) {
        case "DATALIST_FULFILLED":
            return Object.assign({}, state, action.res );
        case "OVERWRITE_EXTEND_COLLIST":
            return Object.assign({}, state, { extendColList : action.payload } );
        default:
            return state;
    }
};

const etlReducer = (state = { data:{}, sending:false, status:{ was:false, fluentd:false, bigquery:false } }, action) => {
    switch (action.type) {
        case "ETL_SEND_FULFILLED":
            return Object.assign({}, state, action.res, {sending: true});
        case "ETL_MONITOR_FULFILLED":
            let complete = action.res.status.was && action.res.status.fluentd && action.res.status.bigquery
            return Object.assign({}, state, action.res, {sending: !complete});
        case "ETL_MONITOR_ERROR":
            return Object.assign({}, state, {sending: false});            
        default:
            return state;
    }
};

const sourgeGenReducer = (state = { source: null  }, action) => {
    switch (action.type) {
        case "SOURCE_FULFILLED":
            return Object.assign({}, state, action.res);
        default:
            return state;              
    }
};
const schemaListReducer = (state = {  }, action) => {
    switch (action.type) {
        case "SCHEMA_LIST_FULFILLED":
            return Object.assign({}, state, action.res);
        default:
            return state;
    }
}


const schemaReducer = (state = { schema: null, fields: null, bigquerySchema:null, fieldMap:{}, bqFieldMap:{} }, action) => {
    switch (action.type) {
        case "SCHEMA_FULFILLED":
            return Object.assign({}, state, action.res, { fieldMap:action.res.fields.reduce((map, f) => { map[f.name] = f; return map; }, state.fieldMap) });
        case "SCHEMA_EDIT_FULFILLED":
            if(action.res.success){
                return Object.assign({}, state,{
                    schema: {
                        ...state.schema,
                        [action.req.payload.name] : action.req.payload.value
                    }
                });
            }else{
                return state;
            }
        case "FIELD_EDIT_FULFILLED":
            if(action.res.success && action.res.data){
                return Object.assign({}, state,{
                    fields: state.fields.map(field=>{
                        if(field.name == action.req.payload.name){
                            // return {...field, [action.req.payload.col]:action.req.payload.value};
                            return Object.assign({},field,action.res.data);
                        }else{
                            return field;
                        }
                    })
                });
            }else{
                return state;
            }
        case "FIELD_ADD_FULFILLED":
            if(action.res.success && action.res.data){
                return Object.assign({}, state,{
                    fields: state.fields.concat(action.res.data),
                    fieldMap: action.res.data.reduce((map, f) => { map[f.name] = f; return map; }, state.fieldMap)
                });
            }else{
                return state;
            } 
        case "BIGQUERY_SCHEMA_FULFILLED":
            console.log(action.res);
            if(action.res.schema && action.res.schema.fields && action.res.schema.fields.length){
                return Object.assign({}, state,{
                    fields: state.fields.map(field=>{
                        let bqmatchfield = action.res.schema.fields.find( row => row.name == field.name );
                        let newfield = { ...field, bigquery_info: bqmatchfield };
                        return newfield;
                    }),
                    bigquerySchema: action.res,
                    bqFieldMap: action.res.schema.fields.reduce((map, f) => { map[f.name] = f; return map; }, state.bqFieldMap) 
                });
            }else{
                return state;
            }
            return state;
        default:
            return state;
    }
};

const alsertMessageReducer = (
    state = {
        msgIdTitle: "info",
        msgIdMessage: "desc",
        message: "...",
        msgIdOk: "ok",
        theme: "warning",
        url: null,
        onOk: null,
        open: false
    },
    action
) => {
    const loading = new RegExp(`_REJECTED$`, "g");
    if (action.type.match(loading)) {
        return Object.assign({}, state, {
            open: true,
            message: action.message,
            theme: "primary"
        });
    }
    switch (action.type) {
        case "TOGGLE_ALERT":
            return Object.assign({}, state, action);
        case "ALERT_MESSAGE":
            return Object.assign({}, state, action, { open: true, theme: "primary" });
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    initParam: initParamReducer,
    loadingBar: loadingBarReducer,
    schemaVo: schemaReducer,
    sourceGen: sourgeGenReducer,
    dataPreview: dataPreviewReducer,
    etl: etlReducer,
    intl: intlReducer,
    alertmessage: alsertMessageReducer,
    loadingStatus: loadingStatusRecuder,
    schemaList: schemaListReducer
});

export default rootReducer;

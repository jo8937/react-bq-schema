import React, { Component } from "react";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import {
    loadingBarMiddleware,
    loadingBarReducer
} from "react-redux-loading-bar";
import logger from "redux-logger";
import { Provider, intlReducer } from "react-intl-redux";

const debuggerReducer = (state = {}, action) => {
    //console.log(action);
    return state;
};

const dataPreviewReducer = (state = { dataList:[], paging:{totalData:0,page:1} }, action) => {
    switch (action.type) {
        case "DATALIST_FULFILLED":
            return Object.assign({}, state, action.res);
        default:
            return state;
    }
};

const etlReducer = (state = { data:null }, action) => {
    switch (action.type) {
        case "ETL_FULFILLED":
            return Object.assign({}, state, action.res);
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
const schemaReducer = (state = { schema: null, fields: null }, action) => {
    switch (action.type) {
        case "SCHEMA_FULFILLED":
            return Object.assign({}, state, action.res);
        case "SOURCE_FULFILLED":
            return Object.assign({}, state, action.res);
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
            if(action.res.success){
                return Object.assign({}, state,{
                    fields: state.fields.map(field=>{
                        if(field.name == action.req.payload.name){
                            return {...field, 
                                [action.req.payload.col]:action.req.payload.value};
                        }else{
                            return field;
                        }
                    })
                });
            }else{
                return state;
            }
        case "FIELD_ADD_FULFILLED":
            if(action.res.success){
                return Object.assign({}, state,{
                    fields: [
                        ...state.fields,
                        {...action.res.field}
                    ]
                });
            }else{
                return state;
            }    
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
        onOk: null,
        open: false
    },
    action
) => {
    const loading = new RegExp(`_REJECTED$`, "g");
    if (action.type.match(loading)) {
        return Object.assign({}, state, {
            open: true,
            message: action.message
        });
    }
    switch (action.type) {
        case "TOGGLE_ALERT":
            return Object.assign({}, state, action);
        case "ALERT_MESSAGE":
            return Object.assign({}, state, action, { open: true });
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    debugger: debuggerReducer,
    schemaVo: schemaReducer,
    sourceGen: sourgeGenReducer,
    dataPreview: dataPreviewReducer,
    etl: etlReducer,
    intl: intlReducer,
    alertmessage: alsertMessageReducer
});

export default rootReducer;

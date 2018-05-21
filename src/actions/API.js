import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { getQueryStringValue } from '../utils/custom-utils';

function parseAppUri(){
  let regexPrefix = "^https?://"+window.location.host+".*/app/([^/]+)/([^/]+)";
  let reg = new RegExp(regexPrefix + "/?.*$");
  let regCate = new RegExp(regexPrefix + "/.*/viewpage/(.+)$");
  let baseUri = "/app/all/logdef";
  let baseCategory = "loginlog";
  if(reg.test(window.location.href)){
    baseUri = window.location.href.replace(reg, "/app/$1/$2");  
  }
  if(regCate.test(window.location.href)){
    baseCategory = window.location.href.replace(regCate, "$3");  
  }
  return {
    "BASE_URI" : baseUri,
    "BASE_CATEGORY" : baseCategory
  }
}

const APP_URI  = parseAppUri();

export default class API{
  static SCHEMA_URI = APP_URI['BASE_URI'] + "/schema/view/" + APP_URI['BASE_CATEGORY'] + ".json";
  static SOURCE_URI = APP_URI['BASE_URI'] + "/schema/generate_source.json";
  static DATALIST_URI = APP_URI['BASE_URI'] + "/data/tabledata.json";
  static SCHEMA_EDIT_URI = APP_URI['BASE_URI'] + "/schema/schema_edit_proc";
  static FIELD_ACTIVE_URI = APP_URI['BASE_URI'] + "/field/active";
  static FIELD_EDIT_URI = APP_URI['BASE_URI'] + "/schema/field_edit_proc";
  static FIELD_ADD_URI = APP_URI['BASE_URI'] + "/schema/field_add_proc.json";
  static ETL_SEND_URI = APP_URI['BASE_URI'] + "/etl/send";
  static ETL_MONITOR_URI = APP_URI['BASE_URI'] + "/etl/monitor";
  static LOGIN_CHECK_URI = "/api/intra/check_login_session";
};
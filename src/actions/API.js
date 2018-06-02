import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { getQueryStringValue } from '../utils/custom-utils';

function parseAppUri(){
  let gameGroup = getQueryStringValue("gamegroup") || "hive";
  let category = getQueryStringValue("category") || "hive_test";
  let params = {
    "GAMEGROUP": gameGroup,
    "PROFILE": "",
    "CONSOLE_HOME":"",
    "BASE_URI" : "/app/"+gameGroup+"/logdef",
    "BASE_CATEGORY" : category
  }
  let url =  window.location.href;
  if (url.includes("test-")){
    params["PROFILE"] = "test";
    params["CONSOLE_HOME"] = "https://localhost";
  }else if (url.includes("sandbox-")){
    params["PROFILE"] = "sandbox";
    params["CONSOLE_HOME"] = "https://localhost";
  }else if (url.includes("localhost")){
    params["PROFILE"] = "local";
    params["CONSOLE_HOME"] = "https://localhost";
  }else{
    params["PROFILE"] = "production";
    params["CONSOLE_HOME"] = "https://localhost";
  }

  return params;
}

const APP_URI  = parseAppUri();

export default class API{
  static INIT_PARAM = APP_URI; 
  static CONSOLE_HOME = APP_URI["CONSOLE_HOME"];
  static CATEGORY = APP_URI["BASE_CATEGORY"];
  static SCHEMA_LIST_URI = APP_URI['BASE_URI'] + "/schema/get/list.json";
  static SCHEMA_URI = APP_URI['BASE_URI'] + "/schema/view.json";
  static BIGQUERY_SCHEMA_URI = APP_URI['BASE_URI'] + "/schema/bigquery.json";
  static SOURCE_URI = APP_URI['BASE_URI'] + "/schema/generate_source.json";
  static DATALIST_URI = APP_URI['BASE_URI'] + "/data/tabledata.json";
  static SCHEMA_EDIT_URI = APP_URI['BASE_URI'] + "/schema/schema_edit_proc";
  static FIELD_ACTIVE_URI = APP_URI['BASE_URI'] + "/field/active";
  static FIELD_EDIT_URI = APP_URI['BASE_URI'] + "/schema/field_edit_proc";
  static FIELD_ADD_URI = APP_URI['BASE_URI'] + "/schema/field_add_proc.json";
  static ETL_SEND_URI = APP_URI['BASE_URI'] + "/etl/send";
  static ETL_MONITOR_URI = APP_URI['BASE_URI'] + "/etl/monitor";
  static LOGIN_CHECK_URI = "/api/intra/check_login_session";
  static LINK_LIST_URI = "/app/"+APP_URI['GAMEGROUP'] + "/define/schema/list";
  static LINK_FORM_URI = "/app/"+APP_URI['GAMEGROUP'] + "/define/schema/write?parentCategory=" + APP_URI["BASE_CATEGORY"];
};
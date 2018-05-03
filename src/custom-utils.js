import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

const queryString = require('query-string');

export default class CustomUtils{
  static getLocale() {
    //console.log(window.location);
    const parsed = queryString.parse(window.location.search);
    return parsed['lang'] ? parsed['lang'] : 'ko';
    //return 'en';
  } 

  static formData(jsonData){
    var params = [];
    for (var p in jsonData)
      if (jsonData.hasOwnProperty(p)) {
        let k = p
        let v = jsonData[p]
        params.push(encodeURIComponent(p) + "=" + encodeURIComponent(v ? v : ""));  
      }
    return params.join("&");
    /*
    const formData = new FormData();
    for(var k in jsonData){
      formData.append(k, jsonData[k]); 
    }
    return formData;
    */
  }

  
}

export function formatMessage(message, values) {
  return <FormattedMessage id={message} defaultMessage={message} values={values}/>;
};
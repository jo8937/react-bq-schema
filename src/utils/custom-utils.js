import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

function getQueryStringValue (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}  

export default class CustomUtils{
  
  static getLocale() {
    //const parsed = querystring.parse(window.location.search);
    let lang = getQueryStringValue("lang");
    return lang ? lang : 'ko';
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

export function formatMessage(message, wrapperClassName) {
  return <span className={wrapperClassName}><FormattedMessage id={message}/></span>;
};
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
}

export function formatMessage(message, values) {
  return <FormattedMessage id={message} defaultMessage={message} values={values}/>;
};
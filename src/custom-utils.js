const queryString = require('query-string');

export default class CustomUtils{
  static getLocale() {
    //console.log(window.location);
    const parsed = queryString.parse(window.location.search);
    return parsed['lang'] ? parsed['lang'] : 'ko';
    //return 'en';
  } 
}
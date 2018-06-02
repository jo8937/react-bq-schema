import fetch from 'cross-fetch';

class FetchTimeoutError extends Error {
  status = 0;
  timeout = "15sec";
}

class CustomFetchHttpStatusError extends Error {
  constructor(status, message, body) {
    super();
    this.status = status;
    this.message = message;
    this.body = body;
  }
}


export default function timeoutfetch(url, options) {
  let customoptions = Object.assign( {
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      "x-requested-with": "XMLHttpRequest"
    },
    timeout: 15000,
    method: "POST"
  }, options );
  
  return Promise.race([
    fetch(url, customoptions).then(res => {
      if (!res.ok) {
        console.log("-------------- FETCH ERROR RES : " + res.status + " FROM " + url);
        console.log(res);
        if(res.status){
          if(res.status == 405){
            throw new CustomFetchHttpStatusError(res.status, "Network request failed : " + res.statusText, res.text());
          }
          if(res.status == 401){
            throw new CustomFetchHttpStatusError(res.status, "Auth fail : " + res.statusText, res.text());
          }
        }
        throw new CustomFetchHttpStatusError(res.status, "Bad response from server : " + res.statusText, res.text());
      }
      return res.json();
    }).catch(err =>{
      console.log("-------------- FETCH ERROR : " + url + " ------------------");
      console.log(customoptions);
      console.log(err);
      console.log("--------------------------------------------------");
      throw err;
    }),
    new Promise((resolve,reject) =>
      setTimeout(() => reject(new FetchTimeoutError('ajax timeout : ' + customoptions.timeout)), customoptions.timeout)
    )
  ]);
}
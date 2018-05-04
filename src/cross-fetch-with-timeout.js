import fetch from 'cross-fetch';

class FetchTimeoutError extends Error {
  a = 0;
}

class HttpStatusError extends Error {

}


export default function timeoutfetch(url, options) {
  const DEFAULT_TIMEOUT_MS = 3000
  var timeoutMs = (options && options.timeout) ? options.timeout : DEFAULT_TIMEOUT_MS;

  let customoptions = Object.assign( {
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    }
  }, options );
  
  return Promise.race([
    fetch(url, customoptions).then(res => {
      if (!res.ok) {
        throw new HttpStatusError("Bad response from server : " + res.status);
      }
      return res.json();
    }).catch(err =>{
      console.log(err);
      throw err;
    }),
    new Promise((resolve,reject) =>
      setTimeout(() => reject(new FetchTimeoutError('ajax timeout : ' + timeoutMs)), timeoutMs)
    )
  ]);
}
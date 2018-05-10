import fetch from 'cross-fetch';

class FetchTimeoutError extends Error {
  a = 0;
}

class HttpStatusError extends Error {

}


export default function timeoutfetch(url, options) {
  let customoptions = Object.assign( {
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    },
    timeout: 3000,
    method: "POST"
  }, options );
  
  return Promise.race([
    fetch(url, customoptions).then(res => {
      if (!res.ok) {
        console.log("-------------- FETCH ERROR RES : " + res.status + " FROM " + url);
        console.log(res);
        if(res.status && res.status == 405){
          throw new HttpStatusError("Network request failed : " + res);
        }
        throw new HttpStatusError("Bad response from server : " + res);
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
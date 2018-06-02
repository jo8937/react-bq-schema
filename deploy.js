var ncp = require('ncp').ncp;
 
ncp.limit = 8;
 
ncp("build","../frontend", function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('done!');
});

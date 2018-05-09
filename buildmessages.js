var fs = require('fs');
var locales = require('./src/locale/index.js');
var PropertiesReader = require('properties-reader');
var messages = locales["locales"];

//console.log(messages);

["en_US","ko_KR"].map( (k) =>{
    var lang = k.split("_")[0];
    var properties = PropertiesReader(`src/locale/messages_${k}.properties`);

    //messages[lang] = {};
    properties.each( (k,v) =>{
        messages[lang][k] = v;
    });
})


var messageFileCont = "module.exports.locales = " + JSON.stringify(messages,null,4)

console.log(messageFileCont);

fs.writeFile("./src/locale/index.js", messageFileCont, () => {});
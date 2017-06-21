var async = require('async')
    , fs = require('fs');
var step1 = "/step1.json";

function readElementFromJsonFile(fileName, elementToRead, cb) {
        var elementToRetrieve = 'nextfile';
        if (elementToRead) {
            elementToRetrieve = elementToRead;
        }
        console.log('file to read from ' + fileName);
        fs.readFile(__dirname + '/' + fileName, "utf8", function (err, data) {
            var element = "";
            if (err) return cb(err);
            try {
                element = JSON.parse(data)[elementToRetrieve];
            } catch (e) {
                return cb(e);
            }
            console.log('element read = ' + element);
            cb(null,element);
        });
}

async.waterfall([ // execute asynchronous calls sequentially, passing the result from each call to the next 
    function (callback) {
         readElementFromJsonFile(step1, null,  function (err, data) {
            if (err) return callback(err);
            callback(null, data);
        });
    }
    ,
    function (value, callback) {
         readElementFromJsonFile(value, null,  function (err, data) {
            if (err) return callback(err);
            callback(null, data);
        });
    }
    ,
    function (value, callback) {
         readElementFromJsonFile(value, null,  function (err, data) {
            if (err) return callback(err);
            callback(null, data);
        });
    },
    function (value, callback) {
         readElementFromJsonFile(value, null,  function (err, data) {
            if (err) return callback(err);
            callback(null, data);
        });
    },
    function (value, callback) {
         readElementFromJsonFile(value, 'actualValue',  function (err, data) {
            if (err) return callback(err);
            callback(null, data);
        });
    },
], function (err, result) { // when all parallel actions are done – do something
    if (err) { console.error(err.message); return; }
    console.log("Final Result: "+result);
})

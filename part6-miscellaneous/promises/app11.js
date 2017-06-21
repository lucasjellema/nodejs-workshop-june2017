var async = require('async')
    , fs = require('fs');
var step1 = "/step1.json";

async.waterfall([ // execute three asynchronous calls sequentially, passing the result from each call to the next 
    function (callback) {
        fs.readFile(__dirname + step1, "utf8", function (err, data) {
            var nextFile = "";
            if (err) return callback(err);
            try {
                nextFile = JSON.parse(data).nextfile;
            } catch (e) {
                return callback(e);
            }
            callback(null, nextFile);
        });
    }
    ,
    function (value, callback) {
        console.log("read file "+value);
        fs.readFile(__dirname + '/' + value, "utf8", function (err, data) {
            var subsequentFile = "";
            if (err) return callback(err);
            try {
                subsequentFile = JSON.parse(data).nextfile;
            } catch (e) {
                return callback(e);
            }
            callback(null, subsequentFile);
        });
    }
    ,
    function (value, callback) {
        console.log("read file "+value);
        fs.readFile(__dirname + '/' + value, "utf8", function (err, data) {
            var subsequentFile = "";
            if (err) return callback(err);
            try {
                subsequentFile = JSON.parse(data).nextfile;
            } catch (e) {
                return callback(e);
            }
            callback(null, subsequentFile);
        });
    },
    function (value, callback) {
        console.log("read file "+value);
        fs.readFile(__dirname + '/' + value, "utf8", function (err, data) {
            var subsequentFile = "";
            if (err) return callback(err);
            try {
                subsequentFile = JSON.parse(data).nextfile;
            } catch (e) {
                return callback(e);
            }
            callback(null, subsequentFile);
        });
    },
    function (value, callback) {
        console.log("read file "+value);
        fs.readFile(__dirname + '/' + value, "utf8", function (err, data) {
            var realValue = "";
            if (err) return callback(err);
            try {
                realValue = JSON.parse(data).actualValue;
            } catch (e) {
                return callback(e);
            }
            callback(null, realValue);
        });
    },
], function (err, result) { // when all parallel actions are done – do something
    if (err) { console.error(err.message); return; }
    console.log("Final Result: "+result);
})

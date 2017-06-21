var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'),   co = require('co');
var cloud = true;

var mongodbHost = '127.0.0.1';
var mongodbPort = '27017';

var authenticate ='';
//cloud
if (cloud) {
 mongodbHost = 'ds139791.mlab.com';
 mongodbPort = '39791';
 authenticate = 'mongouser:mongopass@'
}


var mongodbDatabase = 'world';

// connect string for mongodb server running locally, connecting to a database called test
var url = 'mongodb://'+authenticate+mongodbHost+':'+mongodbPort + '/' + mongodbDatabase;



co(function*() {
  // Use connect method to connect to the Server
  var db = yield MongoClient.connect(url);

  console.log("Connected correctly to server");
  
  // Close the connection
  db.close();
}).catch(function(err) {
  console.log(err.stack);
});
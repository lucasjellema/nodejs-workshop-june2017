var async = require('async')

var delay = 1500;  //miliseconds

var numberOfLoops = 5;
var results = Array(numberOfLoops);

function doStuff(param, cb) {
      setTimeout(function () {
        console.log("Stuff was done for parameter " + param);
        cb(param.toUpperCase());
    }, delay * (0.7 + Math.random()));
}

function reportExecutionTime() {
    var end = new Date() - start;
    console.info("Execution time: %dms", end);
    console.info("Results: " + JSON.stringify(results));
}

var start = new Date();


// This array is initialized with numberOfLoops elements that are set using the fill method 
// and subsequently handed to the map() method (see https://www.w3schools.com/jsref/jsref_map.asp ). 
// In the map() method, the value for each element in the array is  mapped to the desired value which is in this case just the index of the array element.
var steps = Array(numberOfLoops).fill().map((_, i) => i);

// use async to reorganize the code
async.forEachOf(steps, function (value, i, callback) {
    doStuff('Step ' + value, function (parameter) {
        console.log("Report back from doStuff for parameter " + parameter);
        results[i] = parameter;
        callback()
    })}, function (err) { // completion of the forEachOf
        // results should now be completed
        reportExecutionTime();
    }
    );// forEachOf	

    console.log("Main loop is done.");
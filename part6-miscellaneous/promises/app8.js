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

function doAdditionalStuff(param, cb) {
    setTimeout(function () {
        console.log("Additional Stuff was done for parameter " + param);
        cb(param + " Enriched!");
    }, delay * (0.5 + 2 * Math.random()));
}

function doMoreStuff(param, cb) {
    setTimeout(function () {
        console.log("More stuff was done for parameter " + param);
        cb(param + " (The finishing touch)");
    }, delay * (0.5 + Math.random()));
}

function oneLastThing(param, cb) {
    setTimeout(function () {
        console.log("One Last Thing for " + param);
        cb('For starters, then '+ param );
    }, delay * (0.1 + 2*Math.random()));
}

function reportExecutionTime() {
    var end = new Date() - start;
    console.info("Execution time: %dms", end);
    console.info("Results: " + JSON.stringify(results));
}

var start = new Date();

// sequential loop resulting in parallel execution
// note how the overall execution time (over all executions) is reported for each individual execution. Also note how the first execution going in may not be the first to be completed
// note2 - check out that the result from each step does not end up in the correct location in the array

// use asynch to reorganize the code

// create an array with as many elements as the value of numberOfLoops
// each element is an integer with the same value as the index of the element : 0,1,2,3,....
var steps = Array(numberOfLoops).fill().map((_, i) => i);

async.forEachOf(steps, function (value, key, callback) { // for each element in array steps call the function - all calls take place in parallel
    async.waterfall([ // execute three asynchronous calls sequentially, passing the result from each call to the next 
        function (callback) {
            doStuff('Step ' + value, function (parameter) {
                console.log("Report back from doStuff for parameter " + parameter);
                callback(null, parameter);
            })
        },
        function (value, callback) {
            doAdditionalStuff(value, function (enrichedParameter) {
                console.log("Report back from doAdditionalStuff for parameter " + enrichedParameter);
                callback(null, enrichedParameter);
            }
            )
        },
        function (value, callback) {
            doMoreStuff(value, function (moreParameter) {
                console.log("Report back from doMoreStuff for parameter " + moreParameter);
                // record the outcome of the waterfall
                callback(null, moreParameter);
            }
            )
        },
        function (value, callback) {
            oneLastThing(value, function (valueNow) {
                console.log("Report back from oneLastThing for parameter " + valueNow);
                // record the outcome of the waterfall
                callback(null, valueNow);
            }
            )
        }
    ],
        // when the entire waterfall is done - assuming no errors occurred - the final outcome reported by the last step in the waterfall is handed to the next function
        function (err, outcome) {
            console.log("Done with the waterfall (for " + value + ")");
            results[key] = outcome;
            callback(); // report to async.forEachOf
        })
}// when all parallel branches are done, this next function is executed
    , function (err) { // completion of the forEachOf
        // results should now be completed
        reportExecutionTime();

    }
);// forEachOf	

console.log("Main loop is done.");
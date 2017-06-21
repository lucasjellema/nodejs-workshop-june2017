

var delay = 1500;  //miliseconds

var numberOfLoops = 5;
var results = Array(numberOfLoops);

function doStuff(param, cb) {
    setTimeout(function () {
        console.log("Stuff was done for parameter " + param);
        cb(param.toUpperCase());
    }, delay * (0.7 + Math.random()));
}

function doAdditionalStuff(param, phoneHome) {
    setTimeout(function () {
        console.log("Additional Stuff was done for parameter " + param);
        phoneHome(param + " Enriched!");
    }, delay * (0.5 + 2*Math.random()));
}

function doMoreStuff(param, returnToSender) {
    setTimeout(function () {
        console.log("More stuff was done for parameter " + param);
        returnToSender(param + " (The finishing touch))");
    }, delay * (0.5 + Math.random()));
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
for (var i = 0; i < numberOfLoops; i++) {
    doStuff('Step ' + i, function (parameter) {
        console.log("Report back from doStuff for parameter " + parameter);
        doAdditionalStuff(parameter, function (enrichedParameter) {
            console.log("Report back from doAdditionalStuff for parameter " + parameter);
            doMoreStuff(parameter, function (moreParameter) {
                console.log("Report back from doMoreStuff for parameter " + moreParameter);
                results[i] = moreParameter;
                reportExecutionTime();
            });

            results[i] = enrichedParameter;
            reportExecutionTime();
        });
    });
}//for
console.log("Main loop is done.");
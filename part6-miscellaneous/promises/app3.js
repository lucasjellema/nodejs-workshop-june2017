var delay = 1500;  //miliseconds
var numberOfLoops = 5;


function doStuff(param, callback) {
    setTimeout(function () {
        console.log("Stuff was done for parameter " + param);
        callback(param);
    }, delay * (1+ Math.random()));
}

function reportExecutionTime() {
    var end = new Date() - start;
    console.info("Execution time: %dms", end);

}

var start = new Date();

// sequential loop resulting in parallel execution
// note how the overall execution time (over all executions) is reported for each individual execution. Also note how the first execution going in may not be the first to be completed 
for (var i = 0; i < numberOfLoops; i++) {
    doStuff('Step ' + i, function (parameter) {
        console.log("Report back from doStuff for parameter " + parameter);
        reportExecutionTime();
    });
}
console.log("Main loop is done.");
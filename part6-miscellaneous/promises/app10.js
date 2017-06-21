var delay = 1500;  //miliseconds

var numberOfLoops = 5;
var results = Array(numberOfLoops);

function doStuff(param) {
    return new Promise( (resolve, reject) => {
        setTimeout(function () {
            console.log("Stuff was done for parameter " + param);
            resolve(param.toUpperCase())
           }
        , delay * (0.7 + Math.random())
        );
    })// promise
}// doStuff

function doAdditionalStuff(param) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("Additional Stuff was done for parameter " + param);
            resolve(param+ " Enriched!")
        }, delay * (0.5 + 2*Math.random()));
    })// promise
}// doAdditionalStuff

function doMoreStuff(param) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("More stuff was done for parameter " + param);
            resolve(param+ " (The finishing touch)")
        }, delay * (0.5 + Math.random()));
    })// promise
}// doMoreStuff

function reportExecutionTime() {
    var end = new Date() - start;
    console.info("Execution time: %dms", end);
    console.info("Results: " + JSON.stringify(results));
}

var start = new Date();

// create an array with a nested promises chain for all integers between 0 and  the value of numberOfLoops
var steps = Array(numberOfLoops).fill().map((_, i) => doStuff('Step '+i).then(doAdditionalStuff).then(doMoreStuff));
var allPromise = Promise.all( steps)
allPromise.then( values => { console.log("All (chained) promises have resolved." ); 
                             results = values; 
                             reportExecutionTime()
                           }, console.error)




console.log("Main loop is done.");
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

// create a chained promise chain for the subsequent calls of asynchronous actions
// see https://strongloop.com/strongblog/promises-in-node-js-an-alternative-to-callbacks/ for background on Promises in Node
var promiseStep1 =  doStuff('Step 1').then(doAdditionalStuff).then(doMoreStuff);
promiseStep1.then( value => { console.log("Chained promises have resolved." ); 
                             results[0] = value; 
                             reportExecutionTime()
                           }, console.error)


console.log("Main loop is done.");
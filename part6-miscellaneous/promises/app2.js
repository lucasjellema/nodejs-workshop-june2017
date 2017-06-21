var delay = 1500;  //miliseconds


function doStuff(param, cb) {
    setTimeout(function () {
        console.log("Stuff was done for parameter " + param);
        cb(param);
    }, delay);
}

function reportExecutionTime() {
    var end = new Date() - start;
    console.info("Execution time: %dms", end);

}

var start = new Date();
doStuff('Step 1', function (parameter) {
    console.log("Report back from doStuff for parameter " + parameter);
    reportExecutionTime();
});
console.log("Main loop is done.");
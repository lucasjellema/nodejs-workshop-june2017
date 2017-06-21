var delay = 1500;  //miliseconds


function doStuff(callback) {
    setTimeout(function () {
        console.log("Stuff was done");
        callback();
    }, delay);
}

doStuff(function (parameter) {
    console.log("Report back from doStuff")
});
console.log("Main loop is done.");
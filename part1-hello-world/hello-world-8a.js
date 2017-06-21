var greeter = require("./greeter-module.js");

var args = process.argv.slice(2); // loose first two elements, because they are "node" and "hello-world-8.js"
// loop over all command line arguments passed into this program and execute anonymous function on each argument
args.forEach(function (val, index, array) {
    setTimeout(greeter.getGreeter(val, greeter.g), index*1500);
});

console.log('The Main Program Flow is Done!');

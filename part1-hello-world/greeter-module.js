var greeter = module.exports;

greeter.g = function (greetedPersoon) {
  console.log("Hello " + greetedPersoon + "!");
  localPrivateFunction();
}

greeter.getGreeter = function (greetee, greetFunction) {
  console.log('I will greet ' + greetee + ' in a little while');
  // return the function (closure= function + local variable state) that timeout can later callback to
  return function () { greetFunction(greetee) };  // the reference to greetee is established when the closure is created
}

function localPrivateFunction() {
  // this function does nothing useful
  // it is not accessible outside this module
  console.log('localPrivateFunction: Only local calls (from inside the module) are allowed.');
}
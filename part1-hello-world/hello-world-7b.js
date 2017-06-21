// callback functions used with timeout
var g = function (greetedPerson) {
          console.log("Hello "+ greetedPerson + "!");
        }

var r = function ( greetFunction, greetee) {
  greetFunction(greetee);
}  


// what we want to achieve is that the call to the function referenced by r is made 1500 ms after executing this line
// that will not happen: the result of the function call itself is scheduled for execution
setTimeout( r(g, 'HENK'),1500);

// this will execute correctly - but it will not greet anyone in particular
setTimeout( g,1500);

// this will execute g again which returns void - not something we can schedule for later execution - which ends in tears.
setTimeout( g('HENK'),1500);


console.log('The Main Program Flow is Done!');

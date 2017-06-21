var q = function() {
  console.log("Hello everyone - even though delayed, I want to welcome you all!");  
}

// have the function referenced by q executed 2.5 seconds into the future 
setTimeout( q,2500);


var s = function() { 
  setTimeout( q,2500);
}

// and schedule s for execution after 2.5 secs - to have it schedule execution of q in another 2.5 secs
setTimeout( s,2500);

setInterval( s,1500);


console.log('The Main Program Flow is Done!');

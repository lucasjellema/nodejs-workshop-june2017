function delay(t) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, t)
   });
}

function myFunc() {
    console.log('At last I can work my magic!');
}

delay(1000).then(myFunc);
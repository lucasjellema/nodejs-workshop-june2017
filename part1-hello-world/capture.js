function startAt(x) {
   function incrementBy(y) {
       return x + y;
   }    
   return incrementBy
}
closure1 = startAt(1);
closure2 = startAt(5);

console.log( "Closure 1 (started at 1): "+ closure1(4));
console.log( "Closure 2 (started at 5): "+ closure1(4));


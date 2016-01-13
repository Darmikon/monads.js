## Monads ##

***forEach***
```javascript
var forEach = require('./foreach');

//create monad
var monad = forEach([1,2,3]);
//or
var monad = forEach({a:1,b:2,c:3});

//add callback for each iteration
function iterator(key,i,source){
	//source array or object
	//do something
   console.log(source[key]);
}

//this line will execute callback only if 
//an array or an object is not empty 
monad.bind(iterator);

//store input value in case input has array.length > 0 or Object.keys().length > 0
monad.value;
```

function MONAD(modifier){
    //to extend monad with own methods
    var prototype = Object.create(null); 
    
    function unit(value){
        var monad = Object.create(prototype); 
        monad.bind = function(func,args){
            return func.apply(undefined, [value].concat(Array.prototype.slice.apply(args || [])));
        };
        
        if(typeof modifier === 'function'){
            modifier(monad,value)
        }
        
        return monad;
    }
    
    
    unit.lift = function(name, func){
        prototype[name] = function(args){
            return unit(this.bind(func,Array.prototype.slice.apply(args || [])));
        }
                                   
        return unit;
    }
    
    return unit;
}

var forEach = MONAD(function(monad,value){
    var type = Object.prototype.toString.call(value).slice(8,-1);  
  
    if(
        !(value && value.length) && 
        !(type === 'Object' && Object.keys(value).length)
    ){
        monad.is_empty = true;
        monad.bind = function(){
            return monad;
        };
    }else{
        monad.bind = function(func,args){
            type === 'Array' 
              ? value.forEach(function(el,index){
              func.apply(undefined, [el,index,value]);
            })
              : Object.keys(value).forEach(function(el,index){
              func.apply(undefined, [el,index,value]);
            });
          
            monad.value = value;
          
            return monad;
        };
    }
});

module.exports = forEach;

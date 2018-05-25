if(Array.prototype.some === undefined){
    Array.prototype.some = function(fun){
        for(var i = 0; i <this.length; i++){
            if(this[i] !== undefined){
                var r = fun(this[i],i,this);
                if(r == true){
                    return true;
                }
            }
        }
        return false;
    }
}
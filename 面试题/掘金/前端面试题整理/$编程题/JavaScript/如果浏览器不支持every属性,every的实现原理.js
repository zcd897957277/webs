if (Array.prototype.every === undefined) {
  Array.prototype.every = function(fun) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] !== undefined) {
        var r = fun(this[i], i, this);
        if (r == false) {
          return false;
        }
      }
    }
    return true;
  };
}

if (Array.prototype.map === undefined) {
  Array.prototype.map = function(fun) {
    var newArr = [];
    for (var i = 0; i < this.length; i++) {
      if (this[i] !== undefined) {
        var r = fun(this[i], i, this);
        newArr[i] = r;
      }
    }
    return newArr;
  };
}

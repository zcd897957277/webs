// if (Array.prototype.reduce === undefined) {
  Array.prototype.reduce = function(fun, base) {
      console.log(base)
    base === undefined && (base = 0);
    console.log(this)
    console.log(arguments)
    for (var i = 0; i < this.length; i++) {
      if (this[i] !== undefined) {
          console.log('----------')
          console.log(base)
          console.log(this[i])
          console.log(i)
          console.log(this)
          console.log('----------')
        base = fun(base, this[i], i, this);
      }
    }
    return base;
  };
// }

var arr = [1, 2, 3, 4];

var aaa = arr.reduce(function(a, b) {
  return a + b;
});

console.log(aaa)

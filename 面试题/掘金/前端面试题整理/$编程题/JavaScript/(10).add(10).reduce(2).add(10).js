Number.prototype.add = function(num) {
  return this + num;
};

Number.prototype.reduce = function(num) {
  return this - num;
};

console.log((10).add(10).reduce(5).add(7));
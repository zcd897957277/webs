var fn = function(a, b, c) {
  return a + b + c;
};

function curry(fn) {
  var arr = [],
    sum = 0,
    mySlice = arr.slice,
    fnLen = fn.length;

  function curring() {
    arr = arr.concat(mySlice.call(arguments));
    console.log(fnLen);
    if (arr.length < fnLen) {
      return curring;
    }
    arr.forEach(elm => {
        sum += elm
    });

    console.log(sum);
    // return fn.apply(this, arr);
  }
  return curring;
}

curry(fn)(1)(2)(3);

// 方法一
function isPrime1(n) {
  if (n == 1) {
    return "1既不是质数也不是合数。";
  } else if (n > 1 && n <= 3) {
    return true;
  } else {
    var num = 0;
    for (var i = 2; i < Math.ceil(Math.sqrt(n)); i++) {
      if (n % i == 0) {
        num++;
      }
    }

    if(num > 0){
      return false;
    }else{
      return true;
    }
  }
}

// 方法二:hash
var isPrime2 = (function() {
  var hash = {};
  return function(n) {
    if (n == 1) {
      return "1既不是质数也不是合数。";
    } else if (n > 1 && n <= 3) {
      return true;
    } else if (hash[n] !== undefined) {
      return hash[n];
    } else {
      var num = 0;
      for (var i = 2; i < Math.ceil(Math.sqrt(n)); i++) {
        if (n % i == 0) {
          num++;
        }
      }

      if(num > 0){
        return (hash[n] = false);
      }else{
        return (hash[n] = true);
      }
    }
  };
})();

console.log(isPrime2(95));

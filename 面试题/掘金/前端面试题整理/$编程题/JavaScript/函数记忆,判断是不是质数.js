// 方法一
function isPrime1(n) {
  if (n == 1) {
    return "1既不是质数也不是合数。";
  } else if (n > 1 && n <= 3) {
    return true;
  } else {
    for (var i = 2; i < Math.sqrt(n); i++) {
      if (n % i == 0) {
        return false;
      }
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
      for (var i = 2; i < Math.sqrt(n); i++) {
        if (n % i == 0) {
          return (hash[n] = false);
        }

        return (hash[n] = true);
      }
    }
  };
})();

console.log(isPrime2(95));

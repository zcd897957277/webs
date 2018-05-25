// 方法1
function fun(n, o) {
  // console.log(arguments);
  // console.log(n)
  console.log(o);

  return {
    fun: function(m) {
      return fun(m, n);
    }
  };
}

var a = fun(0);
a.fun(1);
a.fun(2);
a.fun(3);
console.log("--------");
a
  .fun(5)
  .fun(6)
  .fun(7)
  .fun(8);

// 方法二
var a = 0,
  b = 0;
function A(a) {
  A = function(b) {
    alert(a + b++);
  };
  alert(a);
}
A(1); //1
A(12); //13

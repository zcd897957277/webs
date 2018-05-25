if (Function.prototype.bind === undefined) {
  Function.prototype.bind = function(obj /*参数列表*/) {
    var fun = this;
    var args = Array.prototype.slice.call(arguments, 1);
    // args保存的就是提前绑定的参数列表
    return function() {
      //将后传入的参数值，转为普通数组
      var innerArgs = Array.prototype.slice.call(arguments);
      var allArgs = args.concat(innerArgs);

      fun.apply(obj, allArgs);
    };
  };
}

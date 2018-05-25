var emp = {
  work: function() {
    var sum = 0;
    // console.log('-------------')
    // console.log(arguments.length)
    // console.log(arguments[0])
    // console.log('-------------')
    for (var i = 0; i < arguments.length && arguments[0] > 0; i++) {
        console.log(arguments.callee)
      sum += arguments[i] + arguments.callee(--arguments[i]);//arguments.callee当前方法
    }
    return sum;
  }
};
console.log(emp.work(6, 2, 1));

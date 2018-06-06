// 方式1
/*
* 调用函数
* 参数分为：true和false;
* 参数说明：传入true实现setInterval()功能；传入false取消setInterval()功能
* */
countTimer(true);
//声明一个变量，用来获取函数，目的是为了能结束这个函数，也就是传入false时结束这个功能。
var fun;
//通过传入一个标记，来判断是否重复执行
function countTimer(flag) {
  if (flag) {
    fun = setTimeout(function() {
      console.log("计数器=》", "ss");
      //递归调用函数，不懂递归请百度
      countTimer(true);
    }, 2000);
  } else {
    //结束函数
    clearTimeout(fun);
  }
}

// 方式1
var executeTimes = 0;
var intervalTime = 500;
var intervalId = null;

// 放开下面的注释运行setInterval的Demo
intervalId = setInterval(intervalFun, intervalTime);
// 放开下面的注释运行setTimeout的Demo
setTimeout(timeOutFun, intervalTime);

function intervalFun() {
  executeTimes++;
  console.log("doIntervalFun——" + executeTimes);
  if (executeTimes == 5) {
    clearInterval(intervalId);
  }
}

function timeOutFun() {
  executeTimes++;
  console.log("doTimeOutFun——" + executeTimes);
  if (executeTimes < 5) {
    setTimeout(arguments.callee, intervalTime);
  }
}

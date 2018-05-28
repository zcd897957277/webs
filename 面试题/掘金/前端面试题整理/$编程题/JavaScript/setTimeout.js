function fn1() {
  for (var i = 0; i < 4; i++) {
    var tc = setTimeout(
      function(i) {
        console.log(i);
        console.log('=================')
        console.log(tc)
        console.log('=================')
        clearTimeout(tc);
      },
      10,
      i
    );
    console.log('--------------');
    console.log(tc);
    console.log('--------------');
  }
}
/*
 fn1() 中
 setTimeout(
    function(i) {
      console.log(i);
      clearTimeout(tc);
    },
    10,
    i
  );
  是一个闭包，所以可以精确的获取i的值，但是tc并没有传入，所有在整个for
  循环中直到可以获得tc的时候，前三个循环已经结束，输出的计时器一直是i=3的计时器，因为 clearTimeout(tc);所以i=3的这个
  计时器被删除了，所以显示的是0,1,2
  
*/
function fn2() {
  for (var i = 0; i < 4; i++) {
    var tc = setInterval(
      function(i, tc) {
        console.log(i);
        clearInterval(tc);
      },
      10,
      i,
      tc
    );
  }
}
fn1();
// fn2();

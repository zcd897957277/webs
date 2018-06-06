function scrollFn() {
  console.log(1);
}

function throttle(method, delay, duration) {
  var timer = null;
  var begin = new Date();
  return function() {
    var context = this,
      args = arguments;
    var current = new Date();
    clearTimeout(timer);
    if (current - begin >= duration) {
      method.apply(context, args);
      begin = current;
    } else {
      timer = setTimeout(function() {
        method.apply(context, args);
      }, delay);
    }
  };
}

window.onscroll = throttle(scrollFn, 100, 500);

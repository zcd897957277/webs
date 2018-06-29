// 观察者: 就是事件模式，比如按钮的onclick这样的应用.
// 简易版本 帮助理解下面的复杂版本
function Publisher() {
  this.listeners = [];
}
Publisher.prototype = {
  'addListener': function(listener) {
      this.listeners.push(listener);
  },

  'removeListener': function(listener) {
      delete this.listeners[listener];
  },

  'notify': function(obj) {
      for(var i = 0; i < this.listeners.length; i++) {
          var listener = this.listeners[i];
          if (typeof listener !== 'undefined') {
              listener.process(obj);
          }
      }
  }
}; // 发布者

function Subscriber() {

}
Subscriber.prototype = {
  'process': function(obj) {
      console.log(obj);
  }
};　// 订阅者

var publisher = new Publisher();
publisher.addListener(new Subscriber());
publisher.addListener(new Subscriber());
publisher.notify({name: 'michaelqin', ageo: 30}); // 发布一个对象到所有订阅者
publisher.notify('2 subscribers will both perform process'); // 发布一个字符串到所有订阅者


// vue event bus
class EventEmeitter {
  constructor() {
    this._events = this._events || new Map(); //存储事件/回调键值对
    this._maxListeners = this._maxListeners || 10; //监听上限
  }
}

// 触发名为type的事件
EventEmeitter.prototype.emit = function(type, ...args) {
  let handler;
  // 从存储事件键值对的this._events中获取对应事件回调函数
  handler = this._events.get(type);
  if (Array.isArray(handler)) {
    // 如果是一个数组说明有多个监听者，需要依次触发里面的函数
    for (let i = 0; i < handler.length; i++) {
      if (args.length > 0) {
        handler[i].apply(this, args);
      } else {
        handler[i].call(this);
      }
    }
  } else {
    // 单个就直接触发
    if (args.length > 0) {
      handler.apply(this, args);
    } else {
      handler.call(this);
    }
  }
  return true;
};

// 监听名为type的事件
EventEmeitter.prototype.addListener = function(type, fn) {
  const handler = this._events.get(type);
  // 将type事件以及对应的fn函数放入this._evnets中储存
  if (!handler) {
    this._events.set(type, fn);
  } else if (handler && typeof handler === "function") {
    // 如果handler是函数说明只有一个监听者
    this._events.set(type, [handler, fn]); //多个监听者我们需要用数组存储
  } else {
    handler.push(fn); //已经有多个监听者，那么直接往数组里push函数
  }
};

// 移除监听
EventEmeitter.prototype.removeListener = function(type, fn) {
  const handler = this._events.get(type); // 获取对应事件名称的函数清单

  // 如果是一个函数，说明只被监听了一次
  if (handler && typeof handler === "function") {
    this._events.delete(type, fn);
  } else {
    let position;
    // 如果handler是数组，说明被监听多次要找到对应的函数
    for (let i = 0; i < handler.length; i++) {
      if (handler[i] === fn) {
        position = i;
      } else {
        position = -1;
      }
    }

    // 如果找到匹配的函数，从数组中清除
    if (position !== -1) {
      // 找到数组对应的位置，直接清除此回调
      handler.splice(position, 1);
      // 如果清除后只有一个函数，那么取消数组，以函数形式保存
      if (handler.length === 1) {
        this._events.set(type, handler[0]);
      }
    } else {
      return this;
    }
  }
};

const emitter = new EventEmeitter();

// 监听一个名为arson的事件对应一个回调函数
emitter.addListener("arson", man => {
  console.log(`expel ${man}`);
});
emitter.addListener("arson", man => {
  console.log(`save ${man}`);
});

emitter.addListener("arson", man => {
  console.log(`kill ${man}`);
});

// 我们触发arson事件,发现回调成功执行 
emitter.emit("arson", "low-end");

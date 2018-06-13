// hash版路由
class Routers {
  constructor() {
    // 以键值对的形式存储路由
    this.routes = {};
    // 当前路由的URL
    this.currentUrl = "";
    // 记录出现过的hash
    this.history = [];
    // 作为指针，默认指向this.history的末尾，根据后退前进指向history中不同的hash
    this.currentIndex = this.history.length - 1;
    // 刷新
    this.refresh = this.refresh.bind(this);
    // 回退
    this.backOff == this.backOff.bind(this);
    // 默认不是后退操作
    this.isBack = false;
    window.addEventListener("load", this.refresh, false);
    windwo.addEventListener("hashchange", this.refresh, false);
  }
  // 将path路径与对应的callback函数储存
  route(path, callback) {
    this.routes[path] = callback || function() {};
  }
  // 刷新
  refresh() {
    // 获取当前URL中的hash路径
    this.currentUrl = location.hash.slice(1) || "/";
    if (!this.back) {
      // 如果不是后退操作,且当前指针小于数组总长度,直接截取指针之前的部分储存下来
      // 此操作来避免当点击后退按钮之后,再进行正常跳转,指针会停留在原地,而数组添加新hash路由
      // 避免再次造成指针的不匹配,我们直接截取指针之前的数组
      // 此操作同时与浏览器自带后退功能的行为保持一致
      if (this.currentIndex < this.history.length - 1) {
        this.history = this.history.slice(0, this.currentIndex + 1);
      }
      this.history.push(this.currentUrl);
      this.currentIndex++;
    }
    // 执行当前hash路径的callback函数
    this.routes[this.currentUrl]();
    this.isBack = false;
  }
  // 后退功能
  backOff() {
    this.isBack = true;
    // 如果指针小于0的话就不存在对应hash路由了，因此锁定指针为0即可
    this.currentIndex <= 0
      ? (this.currentIndex = 0)
      : (this.currentIndex = this.currentIndex - 1);
    // 随着后退，location.hash也应该随之变化
    location.hash = `#${this.history[this.currentIndex]}`;
    // 执行指针目前指向hash路由对应的callback
    this.routes[this.history[this.currentIndex]]();
  }
}

// HTML5 History版路由
class Routers {
  constructor() {
    this.routes = {};
    // 在初始化时监听popstate事件
    this._bindPopState();
  }
  // 初始化路由
  init(path) {
    history.replaceState({ path: path }, null, path);
    this.routes[path] && this.routes[path]();
  }
  // 将路径和对应回调函数加入hashMap储存
  route(path, callback) {
    this.routes[path] = callback || function() {};
  }

  // 触发路径对应回调
  go(path) {
    history.pushState({ path: path }, null, path);
    this.routes[path] && this.routes[path]();
  }

  // 监听popstate事件
  _bindPopState() {
    window.addEventListener("popstate", e => {
      const path = e.state && e.state.path;
      this.routes[path] && this.routes[path]();
    });
  }
}

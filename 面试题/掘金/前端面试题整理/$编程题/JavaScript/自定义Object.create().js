Object.create = function(father, props) {
  console.log("我的create");
  /*使用setPrototypeOf方法
      var o=Object();//1. 创建空对象
      Object.setPrototypeOf(o,father);//2. 继承father
      */
  /*不使用setPrototypeOf方法
      function Constructor(){}
      Constructor.prototype=father;
      var o=new Constructor();
      */
  Object.defineProperties(o, props);
  return o;
};

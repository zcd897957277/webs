// (1)
// typeof 无法判断 只能判断原始类型的值和函数
// (2)
// isPrototypeOf 判断父及对象   可检查整个原型链 //可能继承自数组
console.log(Array.prototype.isPrototypeOf([]) ? "是数组" : "不是数组");
console.log(Array.prototype.isPrototypeOf({}) ? "是数组" : "不是数组");
console.log(
  Array.prototype.isPrototypeOf(function notArr() {}) ? "是数组" : "不是数组"
);
// (3)
// constructor 检查指定对象的构造函数 可检查整个原型链  //可能继承自数组
var father = {};
var son = {};
father.__proto__ = Array.prototype;
son.__proto__ = father;
console.log('-------')
console.log(
    Object.prototype.toString.call(son)
  );
console.log(son.__proto__.prototype == father.prototype)
console.log(son.__proto__.__proto__.constructor == Array ? "是数组" : "不是数组");
console.log({}.contructor == Array ? "是数组" : "不是数组");
console.log(function() {}.contructor == Array ? "是数组" : "不是数组");
// (4)
//  instanceof 检查一个对象是否是制定构造函数的实例 可检查整个原型链 //可能继承自数组
var father = {};
var son = {};
father.__proto__ = Array.prototype;
son.__proto__ = father;
console.log(son instanceof Array ? "是数组" : "不是数组");
console.log({} instanceof Array ? "是数组" : "不是数组");
console.log(function() {} instanceof Array ? "是数组" : "不是数组");
//(5)强行用要检查的对象，调用原始的toString方法  不检查整个原型链
//[object class]: class-Array Date Object
//只能检查最初就是数组创建的对象。
console.log(
  Object.prototype.toString.call([]) == "[object Array]" ? "是数组" : "不是数组"
);
console.log(Object.prototype.toString.call({}));
console.log(Object.prototype.toString.call(function() {}));
console.log(Object.prototype.toString.call(/\d/));
var father = {};
var son = {};
father.__proto__ = Array.prototype;
son.__proto__ = father;
console.log(
  Object.prototype.toString.call(son) == "[object Array]"
    ? "是数组"
    : "不是数组"
); //不是
//结论: 对象一旦创建，class属性就无法修改
//修改继承关系，也无法修改class属性
// (6) Array.isArray(obj)  不检查整个原型链
console.log(Array.isArray([]));
console.log(Array.isArray({}));
//如果浏览器不支持isArray
if (Array.prototype.isArray === undefined) {
  //if(!Array.isArray)
  //给?添加isArray方法
  Array.prototype.isArray = function(arg) {
    //强行调用原始toString方法，和"[object Array]"比较
    return Object.prototype.toString.call(arg) == "[object Array]"
      ? "是数组"
      : "不是数组";
  };
}

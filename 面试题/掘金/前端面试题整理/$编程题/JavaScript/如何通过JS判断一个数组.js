// 1. instanceof 方法
// instanceof 运算符是用来测试一个对象是否在其原型链原型构造函数的属性。
var arr = [];
var judge1 = arr instanceof Array; // true
console.log(judge1);

// 2.constructor
// constructor 属性返回对创建此对象的数组函数的引用，就是返回对象相对应的构造函数。
var arr = [];
console.log(arr.constructor == Array); //true

// 3. 特性判断法
// 利用判断数组独有的length和splice方法，
// 但是这是不靠谱的，因为对象也能添加方法和属性。那怎么办了，有一个办法，可以利用数组的length属性没法枚举来判断。
// object.propertyIsEnumerable("length") 判断数组的length属性是不是不可以枚举
function isArray(object) {
  return (
    object &&
    typeof object === "object" &&
    typeof object.length === "number" &&
    typeof object.splice === "function" &&
    !object.propertyIsEnumerable("length")
  );
}

console.log(isArray(arr));

// 4. 最简单的方法
// 这种写法，是 jQuery 正在使用的，淘宝的 kissy 也是使用这种方式。
Object.prototype.toString.call(value) == '[object Array]'; 

// 5. ES5新增方法isArray()
var a = new Array(123);
var b = new Date();
console.log(Array.isArray(a)); // true
console.log(Array.isArray(b)); // false

// &扩展：
// 使用instaceof和construcor，被判断的array必须是在当前页面声明的。比如，一个页面（父页面）有一个框架，框架中引用了一个页面（子页面），在子页面中声明了一个array，并将其赋值给父页面的一个变量，这时判断该变量，Array == object.constructor;会返回false。
// 最简单的方法，在IE6下判断null和undefined，有一些bug，判断undefined和null均为Object，(并不是bug，是在ES3的标准下返回的就为Object)

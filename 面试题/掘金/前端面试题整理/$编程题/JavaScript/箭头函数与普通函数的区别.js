// 首先知道一下什么是箭头函数，箭头函数就是没有function关键字，而是一个类似箭头的函数：

// var a = ()=>{
//   return 1;
// }
// 相当于

// function a(){
//   return 1;
// }
// 那么就来看一下他们的区别

// 箭头函数作为匿名函数,是不能作为构造函数的,不能使用new
// var B = ()=>{
//   value:1;
// }

// var b = new B(); //TypeError: B is not a constructor
// 箭头函数不绑定arguments,取而代之用rest参数…解决
// function A(a){
//   console.log(arguments); //[object Arguments] {0: 1}
// }

// var B = (b)=>{
//   console.log(arguments); //ReferenceError: arguments is not defined
// }

// var C = (...c)=>{ //...c即为rest参数
//   console.log(c); //[3]
// }
// A(1);
// B(2);
// C(3);
// 箭头函数会捕获其所在上下文的 this 值，作为自己的 this 值
// var obj = {
//   a: 10,
//   b: function(){
//     console.log(this.a); //10
//   },
//   c: function() {
//      return ()=>{
//            console.log(this.a); //10
//      }
//   }
// }
// obj.b(); 
// obj.c()();
// 箭头函数当方法使用的时候没有定义this绑定
// 这句话是MDN里面写的，但是我觉得这条和上条其实是一条，还是捕获所在的上下文，比如下面这个例子：b是一个箭头函数，然后它的 this是指向window，这是为什么呢，因为箭头函数捕获的是obj{}这个对象的环境，然后这个环境的this指向的是window，就相当于上一条的例子：在c方法里面return的那个箭头函数捕获的是c:function(){}这个环境的this，而这个环境的this是obj，这样是不是就清晰明了了

// var obj = {
//   a: 10,
//   b: () => {
//     console.log(this.a); //undefined
//     console.log(this); //window
//   },
//   c: function() {
//     console.log(this.a); //10
//     console.log(this); //obj{...}
//   }
// }
// obj.b(); 
// obj.c();
// 使用call()和apply()调用
// 通过 call() 或 apply() 方法调用一个函数时，只是传入了参数而已，对 this并没有什么影响

// var obj = {
//   a: 10,
//   b: function(n){
//     var f = (v) => v + this.a;
//     return f(n);
//   },
//   c: function(n) {
//     var f = (v) => v + this.a;
//     var m = {a:20};
//     return f.call(m,n);
//   }
// }

// console.log(obj.b(1)); //11
// console.log(obj.c(1)); //11
// 箭头函数没有原型属性
// var a = ()=>{
//   return 1;
// }

// function b(){
//   return 2;
// }

// console.log(a.prototype);//undefined
// console.log(b.prototype);//object{...}
// 箭头函数不能当做Generator函数,不能使用yield关键字
// 箭头函数不能换行
// var a = ()
//           =>1; //SyntaxError: Unexpected token =>
// 对于函数的this指向问题，我总结了下面两句话：

// 箭头函数的this永远指向其上下文的 this，任何方法都改变不了其指向，如call(), bind(), apply()
// 普通函数的this指向调用它的那个对象
/*
  第一种
*/
// var fn = function(a, b, c) {
//   return a + b + c;
// };

// function curry(fn) {
//   var arr = [],
//     sum = 0,
//     mySlice = arr.slice,
//     fnLen = fn.length;

//   function curring() {
//     arr = arr.concat(mySlice.call(arguments));
//     console.log(fnLen);
//     if (arr.length < fnLen) {
//       return curring;
//     }
//     arr.forEach(elm => {
//         sum += elm
//     });

//     console.log(sum);
//     // return fn.apply(this, arr);
//   }
//   return curring;
// }

// curry(fn)(1)(2)(3);

/*
  第二种
*/
// var getN;
// function add(n) {
//   getN = function() {
//     console.log(n);
//   };

//   return function(m) {
//     n += m;
//     arguments.callee.toString = function() {
//       return n;
//     };
//     return arguments.callee;
//   };
// }

// add(1)(2)(3);
// console.log(getN()); //6
// add(1)(2)(3)(4);
// console.log(getN()); //10
// console.log(add(1)(2)(3)); //6
// console.log(add(1)(2)(3)(4)); //10

/*
  第三种
*/

// function add(a, b) {
//   return a + b;
// }

// 通用版本
// var curry = function(func) {
//   var args = [].slice.call(arguments, 1);
//   console.log(arguments)
//   console.log(args)
//   return function() {
//     console.log(arguments)
//     var newArgs = args.concat([].slice.call(arguments));
//     console.log(newArgs)
//     console.log('------------')
//     return func.apply(this,newArgs);
//   };
// };

// var addCurry1 = curry(add, 1, 2);
// console.dir(addCurry1());
// var addCurry2 = curry(add, 1);
// console.dir(addCurry2(2));
// var addCurry3 = curry(add);
// console.dir(addCurry3(1, 2));

// 改进版
// var curry = function(func, args) {
//   var length = func.length;
//   var args = args || [];
//   console.log(func)
//   console.log(args)
//   console.log(arguments)
//   return function() {
//     newArgs = args.concat([].slice.call(arguments));
//     if (newArgs.length < length) {
//       return curry.call(this, func, newArgs);
//     } else {
//       return func.apply(this, newArgs);
//     }
//   };
// };

// var addCurry = curry(add);
// console.log(addCurry(1, 2)); //3
// console.log(addCurry(1)(2)); //3

// 进阶版
function add() {
  var args = [].slice.call(arguments);
  var fn = function() {
    var newArgs = args.concat([].slice.call(arguments));
    return add.apply(null, newArgs);
  };

  fn.toString = function() {
    return args.reduce(function(a, b) {
      return a + b;
    });
  };
  return fn;
}

console.dir(add(1)(2)(3).toString());
console.dir(add(1, 2, 3)(4).toString());
console.dir(add(1)(2)(3)(4)(5).toString());
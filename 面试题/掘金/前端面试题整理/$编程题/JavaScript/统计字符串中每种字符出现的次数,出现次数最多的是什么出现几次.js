var str = "helloworld";

// 方法一：hash
// for (var i = 0, hash = {}; i < str.length; i++) {
//   if (hash[str[i]]) {
//     hash[str[i]]++;
//   } else {
//     hash[str[i]] = 1;
//   }
// }
// console.log(hash);

// 方法二：用正则
console.log(str.split(""))
console.log(str.split("")
.sort())
console.log(str.split("")
.sort()
.join(""))
console.log(str.split("")
.sort()
.join("")
.match(/([a-z])\1*/g))
var arr = str.split("")
        .sort()
        .join("")
        .match(/([a-z])\1*/g)
        .sort(function(a,b){
            return b.length - a.length;
        })
console.log(arr)
console.log("出现最多的是：" + arr[0][0]
    + "共" + arr[0].length + "次");

var hash = {};
arr.forEach(function(val){
    console.log(val)
    hash[val[0]] = val.length;
});
console.dir(hash);
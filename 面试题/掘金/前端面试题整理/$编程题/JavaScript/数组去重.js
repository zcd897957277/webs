// 方法一：
var arr1 = [1, 2, 3, 2, 1, 2];
function repeat1(arr) {
  for (var i = 0, arr2 = []; i < arr.length; i++) {
    if (arr2.indexOf(arr[i]) == -1) {
      arr2.push(arr[i]);
    }
  }

  return arr2;
}

// 方法二：
function repeat2(arr) {
  //遍历arr中每个元素，同时声明hash
  for (var i = 0, hash = {}; i < arr.length; i++) {
    //hash中是否包含当前元素值的建
    //如果不包含,就hash添加一个新元素，以当前元素值为key，value默认为1
    if (hash[arr[i]] === undefined) {
      hash[arr[i]] = 1;
    }
  }

  //将hash转为索引:
  var i = 0;
  var arr2 = [];
  for (arr2[i++] in hash);
  return arr2;
}

// 方法三：
function repeat3(arr) {
  // 正则表示 三部分 第一部分 指开头或者有两个,,
  // 第二部分 表示不能有,一个以上
  // 第三部分 获取的是,, + 第二个（）获取的数据  
  return arr
    .sort()
    .join(",,")
    .replace(/(^|,,)([^,]+)(,,\2)*/g, "$1$2")
    .split(",,");
}
console.log(repeat3(arr1));

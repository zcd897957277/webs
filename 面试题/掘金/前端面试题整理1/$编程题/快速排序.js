// 采用二分法，取出中间数，数组每次和中间数比较，小的放到左边，大的放到右边
var arr = [3, 1, 4, 6, 5, 7, 2];

function quickSort(arr) {
  if (arr.length == 0) {
    return []; //返回空数组
  }

  var cIndex = Math.floor(arr.length / 2);
  var c = arr.splice(cIndex, 1);
  var l = [];
  var r = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < c) {
      l.push(arr[i]);
    } else {
      r.push(arr[i]);
    }
  }

  return quickSort(l).concat(c, quickSort(r));
}

console.log(quickSort(arr));

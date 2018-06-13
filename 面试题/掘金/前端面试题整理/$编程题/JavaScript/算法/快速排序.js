// 采用二分法，取出中间数，数组每次和中间数比较，小的放到左边，大的放到右边
// 方法一： 阮一峰版不推荐
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

// 方法二：标准版推荐
function quick(array, left, right) {
  let index;
  if (array.length > 1) {
    index = partition(array, left, right);
    if (left < index - 1) {
      quick(array, left, index - 1);
    }
    if (index < right) {
      quick(array, index, right);
    }
  }
  return array;
}

function quickSort(array) {
  return quick(array, 0, array.length - 1);
}

// 划分操作
function partition(array, left, right) {
  // 用index取中间值而非splice
  const pivot = array[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while (compare(array[i], pivot) === -1) {
      i++;
    }
    while (compare(array[j], pivot) === 1) {
      j--;
    }
    if (i <= j) {
      swap(array, i, j);
      i++;
      j--;
    }
  }
  return i;
}

// 比较函数
function compare(a, b) {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
}

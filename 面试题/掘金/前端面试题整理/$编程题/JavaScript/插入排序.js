var arr = [2, 4, 1, 5, 3];
function insertSort(arr) {
  // 遍历arr中每一个元素（i从1开始）
  for (var i = 1; i < arr.length; i++) {
    // 将当前元素临时保存在变量t中
    var t = arr[i];  
    var p = i - 1; //声明变量p = i -1;
    // 循环：（arr[p]>t && p >=0）
    while (arr[p] > t && p >= 0) {
      // 将p位置的值，赋值给p+1位置
      arr[p + 1] = arr[p];
      p--;
    }
    arr[p + 1] = t; //将t放在p+1的位置上
  }
}

insertSort(arr);
console.log(String(arr));

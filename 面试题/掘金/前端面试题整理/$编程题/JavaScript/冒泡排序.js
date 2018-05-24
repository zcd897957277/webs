// 每次比较相邻的两个数，如果后一个比前一个小，换位置
var arr = [3, 1, 4, 6, 5, 7, 2];

function bubbleSort(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - 1; j++) {
      if (arr[j + 1] < arr[j]) {
        var temp;
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

console.log(bubbleSort(arr));

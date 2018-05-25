var arr = [[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 13], ["a", "b", "c", "d"]];

// 方法一
for (var r = 0, arr1 = []; r < arr.length; r++) {
  for (var c = 0; c < arr[r].length; c++) {
    arr1.push(arr[r][c]);
  }
}
// console.dir(arr1);

// 方法二
for (var r = 0, arr2 = []; r < arr.length; r++) {
  arr2 = arr2.concat(arr[r]);
}
// console.dir(arr2);

// 方法三
var arr3 = [].concat.apply([],arr);
console.dir(arr3)
/**
*我的jQuery全局函数库(Library)，基于jQuery而编写
*/

if(!window.jQuery){
  throw new Error('我的函数库依赖于jQuery');
}

jQuery.lwh = {};    //名称空间对象

jQuery.lwh.avg = function(arr){
  var sum = 0;
  for(var i=0; i<arr.length; i++){
    sum += arr[i];
  }
  return sum/arr.length;
}

jQuery.lwh.max = function(arr){  
  var num = arr[0];
  for(var i=1; i<arr.length; i++){
    if(arr[i] > num){
      num = arr[i]
    }
  }
  return num;
}

jQuery.lwh.min = function(arr){
  var num = arr[0];
  for(var i=1; i<arr.length; i++){
    if(arr[i] < num){
      num = arr[i]
    }
  }
  return num;
}
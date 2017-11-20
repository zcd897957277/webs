/**
*我的函数库(Library)
*/
var lwh = {};   //名称空间对象 namespace

lwh.avg = function(arr){
  var sum = 0;
  for(var i=0; i<arr.length; i++){
    sum += arr[i];
  }
  return sum/arr.length;
}

lwh.max = function(arr){  
  var num = arr[0];
  for(var i=1; i<arr.length; i++){
    if(arr[i] > num){
      num = arr[i]
    }
  }
  return num;
}

lwh.min = function(arr){
  var num = arr[0];
  for(var i=1; i<arr.length; i++){
    if(arr[i] < num){
      num = arr[i]
    }
  }
  return num;
}
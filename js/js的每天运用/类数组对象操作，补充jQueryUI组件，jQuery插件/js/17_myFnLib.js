/**
*我的jQuery对象函数库(Library)，基于jQuery而编写
*/
if(!window.jQuery){
  throw new Error('我的函数库依赖于jQuery');
}
/**调用方法： $('选择器').avg()  **/
jQuery.fn.avg = function(){
  //this => jQuery对象，类数组对象
  var sum = 0;
  for(var i=0; i<this.length; i++){
    sum += parseFloat( this[i].innerHTML );
  }
  return sum / this.length;  
}

/**调用方法： $('选择器').max()  **/
jQuery.fn.max = function(){
  //this => jQuery对象，类数组对象
  var num = parseFloat(this[0].innerHTML);
  for(var i=1; i<this.length; i++){
    var n = parseFloat(this[i].innerHTML);
    if(n>num){
      num = n;
    }
  }
  return num;  
}

/**调用方法： $('选择器').min()  **/
jQuery.fn.min = function(){
  //this => jQuery对象，类数组对象
  var num = parseFloat(this[0].innerHTML);
  for(var i=1; i<this.length; i++){
    var n = parseFloat(this[i].innerHTML);
    if(n<num){
      num = n;
    }
  }
  return num;  
}



/*
function Emp(){
  this.work = function(){
    console.log(this);
  }
}
var e1 = new Emp();  e1.work();
var e2 = new Emp();  e2.work();
*/

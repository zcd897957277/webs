// JavaScript Document
/* 我的jQuery全局函数库(Library) */

jQuery.zcd={};//名称空间对象  namespace

if(!window.jQuery){
	throw new Error('我的函数库依赖于jQuery');
}

jQuery.zcd.avg=function(arr){//数组平均数
	var sum=0;
	for(var i=0;i<arr.length;i++){
		sum+=arr[i];
	}
	return sum/(arr.length);
}
jQuery.zcd.myMax=function(arr){//数组最大值
	var num=arr[0];
	for(var i=0;i<arr.length;i++){
		if(arr[i]>num){
			num=arr[i];
		}
	}
	return num;
}
jQuery.zcd.myMin=function(arr){//数组最小值
	var num=arr[0];
	for(var i=0;i<arr.length;i++){
		if(arr[i]<num){
			num=arr[i];
		}
	}
	return num;
}
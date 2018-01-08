//进度值：0-100
var value=0;
//修改进度条进度
function progress(){
	var bar=document.getElementById("bar");
	var div=bar.firstChild;//进度条内部显示进度的div
	var span=bar.lastChild;//进度条内部显示文字的span
	//获取元素内嵌样式中的宽度可使用e.style.width
	//但对于获取外部样式文件中指定的宽度必须考虑浏览器兼容性问题
	var barWidth=null;//整个进度条外框的最终显示样式对象中的宽度
	if(bar.currentStyle){//IE使用e.currentStyle获取元素样式对象
		barWidth=bar.currentStyle.width;
	}else{
		//IE使用window.getComputedStyle(e.styleName);获取元素样式对象
		barWidth=window.getComputedStyle(bar,null).width;
	}
	barWidth=parseInt(barWidth);
	
	//修改进度条宽度和提示文本内容
	div.style.width=(value/100)*barWidth+'px';
	span.innerHTML='系统检测进度：'+value+'%';
	
	//若进度值未到100，则继续调用修改进度方法
	if(value<100){
		setTimeout('progress()',1000);//递归调用
	}
	
	//修改进度值
	value+=(parseInt(Math.random()*20)+10);
	value=value>100?100:value;
}

// JavaScript Document
/* 我的jQuery对象函数库(Library)*/

if(!window.jQuery){
	throw new Error('我的函数库依赖于jQuery');
}

//调用方法：$('选择器').avg()
jQuery.fn.avg=function(){//数组平均数
	//this->jQuery对象，类数组对象
	var sum=0;
	for(var i=0;i<this.length;i++){
		sum+=parseFloat(this[i].innerHTML);
	}
	return sum/(this.length);
}
jQuery.fn.myMax=function(){//数组最大值
	var num=parseFloat(this[0].innerHTML);
	for(var i=0;i<this.length;i++){
		var n=parseFloat(this[i].innerHTML)
		if(n<num){
			num=n;
		}
	}
	return num;
}
jQuery.fn.myMin=function(){//数组最小值
	var num=parseFloat(this[0].innerHTML);
	for(var i=0;i>this.length;i++){
		var n=parseFloat(this[i].innerHTML)
		if(n>num){
			num=n;
		}
	}
	return num;
}
jQuery.fn.accordion=function(){//手风琴对象函数
	//this->jQuery对象，类数组对象 已是jQuery对象不用加$('')
	//修改h3的样式
	this.children('div').css({//所有div隐藏
		display:'none'	
	});
	this.children('h3').css({
		background:'#ddd',
		padding:'8px 0',
		cursor:"pointer",
	}).click(function(){
		//this->h3 DOM对象
		$(this).next().slideToggle(300);
	});
}
jQuery.fn.tabs=function(){//标签页对象函数
	this.find('ul>li>a').css({
		listStyle:'none',
		textDecoration:'none',
		color:'#000',
		padding:'px 8px',
		border:'1px solid #ddd',
		background:'#fff',
		cursor:'pointer'
	}).click(function(e){
		e.preventDefault();
		$(this).css({
			color:'#fff',
			background:'blue',
		})
		var id=$(this).attr('href');
		$(id).show().siblings('div').hide();
	});
	this.find('ul').css({
		listStyle:'none',
		padding:'10px 10px 0 10px',
		background:'#ccc',
	})
	this.find('ul>li').css({
		display:'inline-block',
	})
	this.children('div:not(:first)').css({
		display:'none',
	})
}
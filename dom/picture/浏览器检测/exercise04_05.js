//浏览器检测
function checkBrowser(){
	var browser={
		appname:'unkname',
		version:0
	}
	var userAgent=navigator.userAgent.toLowerCase();
	if(/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(userAgent)){
		browser.appname=RegExp.$1;
		browser.version=RegExp.$2;
	}else if(/version\D+(\d[\d.]*).*safari/.test(userAgent)){
		browser.appname='safari';
		browser.version=RegExp.$2;
	}
	//将检测结果显示在页面中
	var div=document.getElementById('checkingResult');
	div.innerHTML='浏览器类型：'+browser.appname+'<br/>浏览器版本：'+browser.version;
}

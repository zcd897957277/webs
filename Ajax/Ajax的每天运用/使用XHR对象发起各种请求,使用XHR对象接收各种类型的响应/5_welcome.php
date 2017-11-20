<?php
header("Content-Type: application/javascript;charset=UTF-8");
/**
*根据客户端浏览器首选语言的不同，向客户端输出不同形式的JS欢迎消息
**/

//获取请求消息的所有头部
$list = getallheaders();

//读取请求头部中的客户端首选语言
$lang = $list['Accept-Language'];
$start2 = substr($lang, 0, 2);  //语言列表中的最开头的首选语言

if($start2==='zh'){  //中文
	echo 'alert("你好")';
}else if($start2==='ja'){  //日文
	echo 'console.log("こんにちは")';
}else {	//其它语言，同意输出英文提示
	echo 'var span = document.createElement("span");span.innerHTML = "HELLO"; document.body.appendChild(span);';
}


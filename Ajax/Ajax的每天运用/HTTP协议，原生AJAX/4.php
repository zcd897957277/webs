<?php
//设置响应消息头部 —— 告诉客户端响应主体的类型
header('Content-Type: text/plain');
//header('Cache-Control: no-cache');

for($i=0; $i<5000; $i++){
	echo "$i-hello ";
}


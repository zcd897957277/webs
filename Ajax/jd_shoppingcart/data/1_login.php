<?php
/**
*接收客户端提交的登录信息，进行验证
*返回数据格式JSON：  			
*{"code": 1000, "msg":"登录信息验证正确"}   	
*{"code": 1001, "msg":"SQL语句错误"} 
*{"code": 1002, "msg":"用户名或密码错误"}
*/
header('Content-Type: application/json;charset=UTF-8');

$uname = $_REQUEST['uname'];
$upwd = $_REQUEST['upwd'];


$conn = mysqli_connect('127.0.0.1', 'root', '', 'jd', 3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM jd_user WHERE uname='$uname' AND upwd='$upwd'";
$result = mysqli_query($conn,$sql);

$output = ['code'=>0, 'msg'=>null];
if($result===false){
	$output['code'] = 1001;
	$output['msg'] = 'SQL语句错误';
}else {
	$row = mysqli_fetch_assoc($result);
	if($row===null){
		$output['code'] = 1002;
		$output['msg'] = '用户名或密码错误';	
	}else {
		$output['code'] = 1000;
		$output['msg'] = '登录信息验证正确';
	}
}

echo json_encode($output);
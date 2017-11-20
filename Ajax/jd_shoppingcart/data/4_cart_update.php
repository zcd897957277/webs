<?php
/***
*根据客户端提交购物车详情编号，和修改的数量，修改购物车详情，返回succ或err
*/
header('Content-Type: text/plain');

$did = $_REQUEST['did'];
$count = $_REQUEST['count'];

$conn = mysqli_connect('127.0.0.1', 'root', '', 'jd', 3306);

///SQL0: 设置SQL编码
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

///SQL1：根据登录用户名查询用户编号
$sql = "UPDATE jd_cart_detail SET count=$count WHERE did=$did";
$result = mysqli_query($conn,$sql);

if(!$result){
	echo 'err';
}else {
	echo 'succ';
}
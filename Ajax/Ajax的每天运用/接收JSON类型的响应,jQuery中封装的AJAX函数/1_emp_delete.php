<?php
/**
*根据客户端提交的员工编号，删除该员工
*返回err或succ
**/
header('Content-Type: text/plain');

$eid = $_REQUEST['eid'];

$conn = mysqli_connect('127.0.0.1', 'root', '', 'tedu', 3306);

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "DELETE FROM emp WHERE eid=$eid";
$result = mysqli_query($conn,$sql);

if($result===false){
	echo 'sqlerr';  //SQL语法错误
}else {
	if( mysqli_affected_rows($conn)===0 ){
		echo 'nonexists';//删除的记录已经不存在
	}else {
		echo 'succ';  //删除成功
	}
}

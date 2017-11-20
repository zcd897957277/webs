<?php
/**
*接收客户端提交的员工信息，保存入数据库
*返回新记录在数据库中的编号
**/
header('Content-Type: text/html');

$ename = $_REQUEST['ename'];
$salary = $_REQUEST['salary'];
$pic = $_REQUEST['pic'];
$deptID = $_REQUEST['deptID'];

$conn = mysqli_connect('127.0.0.1', 'root', '', 'tedu', 3306);

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "INSERT INTO emp VALUES(NULL,'$ename','$salary','$pic','$deptID')";
$result = mysqli_query($conn,$sql);

if($result===false){
	echo '0';
}else {
	echo mysqli_insert_id($conn);
}

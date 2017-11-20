<?php
/**
*根据客户端提交的部门编号，向客户端输出所有的员工列表
*以HTML格式
**/
header('Content-Type: text/html');

$did = $_REQUEST['did'];

$conn = mysqli_connect('127.0.0.1', 'root', '', 'tedu', 3306);

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM emp WHERE deptID=$did";
$result = mysqli_query($conn,$sql);

while( ($emp=mysqli_fetch_assoc($result))!==null ){
	echo "<option value='$emp[eid]'>$emp[ename]</option>";
}


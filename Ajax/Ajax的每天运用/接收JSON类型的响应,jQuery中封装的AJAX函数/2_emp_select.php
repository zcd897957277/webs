<?php
/**
*根据客户端提交的部门编号，查询出所有的员工
*以JSON格式
**/
header('Content-Type: application/json');

$deptID = $_REQUEST['deptID'];

$conn = mysqli_connect('127.0.0.1', 'root', '', 'tedu', 3306);

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM emp WHERE deptID=$deptID";
$result = mysqli_query($conn,$sql);

$arr = [];
while( ($emp=mysqli_fetch_assoc($result))!==null ){
	///echo json_encode($emp);
	$arr[] = $emp;
}

$str = json_encode($arr);
echo $str;
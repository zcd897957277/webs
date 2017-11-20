<?php
/**
*向客户端输出所有的部门列表
*以HTML格式
**/
header('Content-Type: text/html');

$conn = mysqli_connect('127.0.0.1', 'root', '', 'tedu', 3306);

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM dept";
$result = mysqli_query($conn,$sql);

while( ($dept=mysqli_fetch_assoc($result))!==null ){
	echo "<option value='$dept[did]'>$dept[dname]</option>";
}


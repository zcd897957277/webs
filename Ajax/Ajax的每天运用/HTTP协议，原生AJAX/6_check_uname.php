<?php
header('Content-Type: text/plain');
/**验证客户端提交的用户名在数据库中是否已经存在**/

$n = $_REQUEST['uname'];

$conn = mysqli_connect('127.0.0.1', 'root', '', 'sohu', 3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM user WHERE name='$n'";
$result = mysqli_query($conn,$sql);

if(!$result){
	echo "sql error: $sql";
}else{
	$row = mysqli_fetch_assoc($result);
	if($row===null){	//查询结果中没有记录
		echo 'bucunzai';
	}else {				//查询结果中有记录
		echo 'cunzai';
	}
}



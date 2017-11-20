<?php
header('Content-Type: text/plain');
/**用户注册**/
$name = $_REQUEST['name'];
$pwd = $_REQUEST['pwd'];

$conn = mysqli_connect('127.0.0.1', 'root', '', 'sohu', 3306);

$sql = 'SET NAMES UTF8';
mysqli_query($conn,$sql);
$sql = "INSERT INTO user VALUES(NULL,'$name','$pwd')";
$result = mysqli_query($conn,$sql);

if(!$result){
	echo 'err';
}else {
	echo 'succ';
}


<?php
header('Content-Type: text/plain;charset=UTF-8');

/**添加书籍信息**/
$bname = $_REQUEST['bname'];
$price = $_REQUEST['price'];

$conn = mysqli_connect('127.0.0.1', 'root', '', 'store', 3306);

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "INSERT INTO book VALUES(NULL,'$bname','$price')";
$result = mysqli_query($conn,$sql);

if(!$result){
	echo '0';  //0:  SQL语法错误
}else {
	echo mysqli_insert_id($conn);
}
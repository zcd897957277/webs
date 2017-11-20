<?php
/**
*根据客户端提交的汽车类型，返回该类型下所有的汽车
*以JSON格式
*/
header('Content-Type: application/json;charset=UTF-8');

$type = $_REQUEST['type'];

$conn = mysqli_connect('127.0.0.1', 'root', '', 'huimaiche', 3306);

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM car WHERE type='$type'";
$result = mysqli_query($conn,$sql);

$arr = [];
while(($car=mysqli_fetch_assoc($result))!=null){
	//echo json_encode($car);//array => json string
	$arr[] = $car;
}

echo json_encode($arr); //JSON字符串最外层要么是一个[] 要么是一个{}
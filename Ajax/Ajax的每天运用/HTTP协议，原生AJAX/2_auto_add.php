<?php
//1 接收请求数据
$name = $_REQUEST['name'];
$price = $_REQUEST['price'];
$count = $_REQUEST['count'];
$pic = $_REQUEST['pic'];

//2 连接数据库
$conn = mysqli_connect('127.0.0.1', 'root', '', 'autohome', 3306);

//3 提交SQL
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "INSERT INTO auto VALUES(NULL,'$name','$price','$count','$pic')";
$result = mysqli_query($conn,$sql);

//4 输出结果
if(!$result){
	echo "添加失败！请检查SQL：$sql";
}else {
	echo "添加成功！新记录在数据库中的编号：".mysqli_insert_id($conn);
}

echo "<hr>";
echo "<a href='3_auto_select.php'>浏览全部汽车</a>";


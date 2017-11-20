<?php
//1 接收客户端提交的请求数据
$userName = $_REQUEST['userName'];
$phone = $_REQUEST['phone'];
$content = $_REQUEST['content'];
$pubTime = time()*1000;

//2 连接数据库
$conn = mysqli_connect('127.0.0.1','root','','tedu',3306);

//3 提交SQL语句
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "INSERT INTO msg VALUES(NULL,'$userName','$phone','$content','$pubTime')";
$result = mysqli_query($conn,$sql);

//4 输出执行结果
if(!$result){
	echo "执行失败！可能原因：$sql";
}else {
	echo "执行成功！添加的记录在数据库的自增编号为：".mysqli_insert_id($conn);
	echo "<hr>";
	echo "<a href='3_msg_select.php'>查看所有留言</a>";
}



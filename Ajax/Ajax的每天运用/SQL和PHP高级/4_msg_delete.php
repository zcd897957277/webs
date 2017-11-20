<?php
//1 接收客户端提交的mid
$mid = $_REQUEST['mid'];

//2 连接数据库
$conn=mysqli_connect('127.0.0.1','root','','tedu',3306);

//3 提交SQL语句
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "DELETE FROM msg WHERE mid=$mid";
$result = mysqli_query($conn,$sql);

//4 输出执行结果
if(!$result){
	echo "删除失败！可能原因：$sql";
}else {
	echo "删除成功！DELETE语句影响的行数：".mysqli_affected_rows($conn); //获取刚刚执行的DML语句影响的行数
}

echo '<hr>';
echo '<a href="1_msg_add.html">添加留言</a><br>';
echo '<a href="3_msg_select.php">查看留言</a>';



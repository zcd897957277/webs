<?php
//0 读取客户端提交的请求数据
$n = $_REQUEST['uname'];
$p = $_REQUEST['pic'];
$t = time()*1000;	//获得服务器系统时间
$a = 1;

//1 连接到MySQL服务器
$conn = mysqli_connect(
	'127.0.0.1',
	'root',
	'',
	'tedu',
	3306
);

//2 提交SQL给服务器执行
$sql = "INSERT INTO user VALUES(NULL,'$n','$p','$t','$a')";
$result = mysqli_query($conn, $sql);

//3 查看执行的结果
if($result===false){
	echo "执行失败！最可能的原因：$sql";
}else {
	echo "执行成功！新插入的记录在服务器中的自增编号为：". mysqli_insert_id($conn);
	//获得$conn刚刚执行的INSERT语句产生的自增编号
}



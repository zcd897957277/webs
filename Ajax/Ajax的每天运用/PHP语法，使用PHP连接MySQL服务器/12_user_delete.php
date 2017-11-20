<?php
//1 读取客户端请求数据
$uid = $_REQUEST['uid'];

//2 连接数据库
$conn = mysqli_connect('127.0.0.1','root','','tedu',3306);

//3 提交SQL命令
$sql = "DELETE FROM user WHERE uid=$uid";
$result = mysqli_query($conn,$sql);

//4 输出执行结果
if($result===false){
  echo "执行失败！可能原因：$sql";
}else {
  echo "执行成功！";
}



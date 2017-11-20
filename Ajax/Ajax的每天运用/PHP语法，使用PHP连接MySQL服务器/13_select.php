<?php
/**查询出所有的用户信息，输出TABLE中**/

//1 读取客户端请求数据

//2 连接数据库
$conn = mysqli_connect('127.0.0.1','root','','tedu',3306);

//3 提交SQL命令
$sql = "SELECT * FROM user";
$result = mysqli_query($conn,$sql);

//4 输出执行结果
if($result===false){
  echo "执行失败！可能原因：$sql";
}else {
  echo "执行成功！";
  #var_dump($result);  
  //$result: 查询结果的描述对象，有n行m列，但并不真正包含查询到的数据——结果集合可能很大
  
  //$row = mysqli_fetch_row($result);  //索引数组
  //var_dump($row);

  /*
  $row = mysqli_fetch_assoc($result);
  var_dump($row);		//第1行
  $row = mysqli_fetch_assoc($result);
  var_dump($row);		//第2行
  $row = mysqli_fetch_assoc($result);
  var_dump($row);		//第3行
  $row = mysqli_fetch_assoc($result);
  var_dump($row);		//第4行:  null

  */

  while(true){
	$row = mysqli_fetch_assoc($result);
	if($row===null){
		break;
	}
	var_dump($row);
  }
}



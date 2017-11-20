<?php
echo '<h1>留言列表</h1>';

//1 连接数据库
$conn=mysqli_connect('127.0.0.1','root','','tedu',3306);

//2 提交查询语句
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql="SELECT * FROM msg";
$result = mysqli_query($conn,$sql);

//3 输出查询结果
if(!$result){
	echo "执行失败！可能原因，SQL语法错误：$sql";
}else {
	//echo "执行成功！";
	/*
	while(true){
		$row = mysqli_fetch_assoc($result);
		if($row===null){
			break;
		}
		var_dump($row);
	}
	*/
	while( ($row=mysqli_fetch_assoc($result))!==null ){
		echo "<a href='4_msg_delete.php?mid=$row[mid]' style='float:right;'>&times;</a>";
		echo "<div>用户姓名：$row[userName]</div>";
		echo "<div>联系电话：$row[phone]</div>";
		echo "<div>发布时间：$row[pubTime]</div>";
		echo "<div>留言内容：$row[content]</div>";
		echo "<hr>";
	}
}

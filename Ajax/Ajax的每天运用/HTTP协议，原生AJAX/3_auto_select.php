<?php
//2 连接数据库
$conn = mysqli_connect('127.0.0.1', 'root', '', 'autohome', 3306);

//3 提交SQL
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "SELECT * FROM auto";
$result = mysqli_query($conn,$sql);

//4 输出结果
if(!$result){
	echo "查询失败！请检查SQL：$sql";
}else {
	echo "<table border='1' width='100%'>";
	echo "<thead>";
	echo "	<tr><th>编号</th><th>图片</th><th>名称</th><th>价格</th><th>数量</th><th>操作</th></tr>";
	echo "</thead>";
	echo "<tbody>";
	while(($auto=mysqli_fetch_assoc($result))!==null){
		echo "<tr>";
		echo " <td>$auto[aid]</td>";
		echo " <td><img style='width:100px' src='$auto[pic]'></td>";
		echo " <td>$auto[name]</td>";
		echo " <td>$auto[price]</td>";
		echo " <td>$auto[count]</td>";
		echo " <td><a href='4_auto_delete.php?aid=$auto[aid]'>删除</a></td>";
		echo "</tr>";
	}
	echo "</tbody>";
	echo "</table>";
}

echo "<hr>";
echo "<a href='1_auto_add.html'>添加汽车</a>";


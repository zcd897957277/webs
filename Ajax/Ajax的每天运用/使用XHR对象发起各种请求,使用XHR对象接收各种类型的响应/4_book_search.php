<?php
/**
*根据客户端提交的查询关键字，返回包含该关键字的书籍列表，形如：
<li>计算机网络</li>
<li>手机网络</li>
<li>网络编程</li>
*/
header('Content-Type: text/html;charset=UTF-8');

$kw = $_REQUEST['kw'];

$conn = mysqli_connect('127.0.0.1', 'root', '', 'store', 3306);

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM book WHERE bname LIKE '%$kw%'";
$result = mysqli_query($conn,$sql);

if(!$result){
	echo "<li>SQL语法错误：$sql</li>";
}else {
	$html = "";
	while(($row=mysqli_fetch_assoc($result))!==null){
		$html .= "<li>$row[bname]</li>";
	}
	echo $html;
}

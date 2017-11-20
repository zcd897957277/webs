<?php
/***
*向客户端输出所有汽车记录，以XML格式
***/
header('Content-Type: application/xml');

$conn = mysqli_connect('127.0.0.1', 'root', '', 'autohome', 3306);

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM auto";
$result = mysqli_query($conn,$sql);

echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<autoList from='汽车之家'>";
while(($row=mysqli_fetch_assoc($result))!==null){
  echo "<auto aid='$row[aid]'>";
  echo "	<name>$row[name]</name>";
  echo "	<price>$row[price]</price>";
  echo "	<pic>$row[pic]</pic>";
  echo "</auto>";
}
echo "</autoList>";
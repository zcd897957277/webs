<?php
/**
*根据客户端提交的部门编号，查询出所有的员工
*以XML格式
**/
header('Content-Type: application/xml');

$deptID = $_REQUEST['deptID'];

$conn = mysqli_connect('127.0.0.1', 'root', '', 'tedu', 3306);

$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM emp WHERE deptID=$deptID";
$result = mysqli_query($conn,$sql);

echo "<?xml version='1.0' encoding='UTF-8'?>";
echo "<empList>";
while( ($emp=mysqli_fetch_assoc($result))!==null ){
  echo "<emp eid='$emp[eid]'>";
  echo "  <ename>$emp[ename]</ename>";
  echo "  <salary>$emp[salary]</salary>";
  echo "  <pic>$emp[pic]</pic>";
  echo "</emp>";
}
echo "</empList>";

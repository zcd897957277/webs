<?php
/***
*根据客户端提交登录用户名，查询该用户的购物车内容
*以JSON格式：[{},{},{}]
SQL1：根据登录用户名查询用户编号
SQL2：根据用户编号查询对应的购物车编号
SQL3：根据购物车编号到购物车详情表和产品表跨表查询购物车中的内容——小心防止出现笛卡尔积
*/
header('Content-Type: application/json;charset=UTF-8');

@$uname = $_REQUEST['uname'];
if(!$uname){
	echo 'err';
	return;
}

$conn = mysqli_connect('127.0.0.1', 'root', '', 'jd', 3306);

///SQL0: 设置SQL编码
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

///SQL1：根据登录用户名查询用户编号
$sql = "SELECT uid FROM jd_user WHERE uname='$uname'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$uid = $row['uid'];  //获取到用户编号

///SQL2: 根据用户编号查询对应的购物车编号
$sql = "SELECT cid FROM jd_cart WHERE userID='$uid'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row===null){	//指定用户没有购物车编号
	echo '[]';	
	return;
}else {
	$cid = $row['cid']; //查询到了购物车编号
}

///SQL3: 根据购物车编号到购物车详情表和产品表跨表查询购物车中的内容——跨表查询
$sql = "SELECT did,pid,pic,pname,price,count FROM jd_product,jd_cart_detail WHERE cartID='$cid' AND  pid=productID";
$result = mysqli_query($conn,$sql);
$output = []; //用于盛放查询到的商品
while(($row=mysqli_fetch_assoc($result))!==null){
	$output[] = $row;
}

echo json_encode($output);
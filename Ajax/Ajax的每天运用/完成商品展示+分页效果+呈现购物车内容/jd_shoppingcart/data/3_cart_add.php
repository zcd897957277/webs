<?php
/**
*根据客户端提交pid和uname，添加一条购物记录
SQL1：根据用户名查询出用户编号
SQL2：查询该用户编号是否已有购物车
SQL3：若用户无购物车，则创建一个购物车
SQL4：查询购物车详情中是否已有指定商品编号
SQL5：若商品编号在购物车中不存在，则创建购买记录
SQL6：若商品编号在购物车中已存在，则更新购买数量
返回JSON数据，可能为：
{"code":2000, "msg":"added"}
{"code":2001, "msg":"updated"}
*/
header('Content-Type: application/json');

@$pid = $_REQUEST['pid'];		//产品编号
@$uname = $_REQUEST['uname'];	//用户名称
if( !$pid  || !$uname){
	echo 'err';
	return; //缺少产品编号、用户名，则退出执行
}


$conn = mysqli_connect('127.0.0.1', 'root', '', 'jd', 3306);

//SQL0: 设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);

//SQL1：根据用户名查询出用户编号
$sql = "SELECT uid FROM jd_user WHERE uname='$uname'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$uid = $row['uid'];	//获得用户编号

//SQL2：查询该用户编号是否已有购物车
$sql = "SELECT cid FROM jd_cart WHERE userID='$uid'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
if($row===null){  //没有购物车 - INSERT
	//SQL3: 若用户无购物车，则创建一个购物车
	$sql = "INSERT INTO jd_cart VALUES(NULL,$uid)";
	$result = mysqli_query($conn,$sql);
	$cid = mysqli_insert_id($conn);
}else {	//已有购物车 - SELECT
	//有购物车，则获得购物车编号
	$cid = $row['cid'];
}

//SQL4：查询购物车详情中是否已有指定商品编号
$sql = "SELECT did FROM jd_cart_detail WHERE cartID=$cid AND productID=$pid";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row===null){ //当前购物车中没有该商品-INSERT
	//SQL5:若商品编号在购物车中不存在，则创建购买记录
	$sql = "INSERT INTO jd_cart_detail VALUES(NULL,'$cid','$pid','1')";
	$result = mysqli_query($conn,$sql);
	$output = [			//待输出的数组
		'code'=>2000,
		'msg'=>'added'
	];
}else { //当前购物车已有该商品-UPDATE
	//SQL6:若商品编号在购物车中已存在，则更新购买数量
	$did = $row['did'];
	$sql = "UPDATE jd_cart_detail SET count=count+1 WHERE did=$did";
	$result = mysqli_query($conn,$sql);
	$output = [
		'code'=>2001,
		'msg'=>'updated'
	];
}

echo json_encode($output);
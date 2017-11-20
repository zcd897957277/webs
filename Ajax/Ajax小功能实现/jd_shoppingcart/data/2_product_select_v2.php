<?php
/**
*向客户端分页返回商品详情，以JSON格式
*/
header('Content-Type: application/json;charset=UTF-8');

@$pno = $_REQUEST['pno'];//@表压制错误消息的显示
if(!$pno){		//客户端未提交pno
	$pno=1;
}else {			//客户端提交了pno
	$pno = intval($pno);  //把字符串解析为整数
}

////分页数据对象//////
$pager = [
	'recordCount'=>0,
	'pageSize'=>8,
	'pageCount'=>0,
	'pno'=>$pno,
	'data'=>[]
];



/**begin：构建分页数据**/
$conn = mysqli_connect('127.0.0.1', 'root', '', 'jd', 3306);

////SQL1: 设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

////SQL2: 查询满足条件的总记录数
$sql = "SELECT COUNT(*) FROM jd_product";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$pager['recordCount'] = intval($row['COUNT(*)']);
$pager['pageCount'] = ceil($pager['recordCount']/$pager['pageSize']);

////SQL3: 查询出当前页中指定的数据
$start = ($pager['pno']-1)*$pager['pageSize'];	//从哪一行开始读取
$count = $pager['pageSize']; //一次最多读取的行数
$sql = "SELECT * FROM jd_product LIMIT $start,$count";
$result = mysqli_query($conn,$sql);
while(($p=mysqli_fetch_assoc($result))!==null){
	$pager['data'][] = $p;
}
/**end：构建分页数据**/


echo json_encode($pager);
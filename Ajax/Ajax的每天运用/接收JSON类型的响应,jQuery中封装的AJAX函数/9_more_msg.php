<?php
/***
*一次向客户端返回五条好友消息
*以JSON格式，形如：
*[ 
	{"mid":1122, "title":"标题1122","content":"内容1122","pubTime":1122},
	{"mid":3339, "title":"标题3339","content":"内容3339","pubTime":3339}
]
*/
header("Content-Type: application/json;charset=UTF-8");

$list = [];  //保存5条消息的大数组

for($i=0; $i<5; $i++){
	//生成一个四位的随机整数
	$mid = rand(1000,10000);
	//向消息数组中添加一条消息
	$list[] = [
		'mid'=>$mid,
		'title'=>"标题$mid",
		'content'=>"内容$mid",
		'pubTime'=>$mid
	];
}

//echo $list;
//var_dump($list);

//索引数组转换为 JSON数组[]
//$arr1 = [10,30,50,'Tom', true];
//echo json_encode($arr1);

//关联数组转换为 JSON对象{}
//$arr2 = ['ename'=>'tom','age'=>20];
//echo json_encode($arr2);


//PHP把数组转换为JSON格式的字符串
$str = json_encode($list); 
echo $str;

<?php
//phpinfo();	//输出当前PHP解释器的版本信息

/**定义array**/
$arr1 = array(1, 3, 5);		//PHP5.3-
$arr2 = [2,4,6];			//PHP5.4+

/**输出数组**/
//echo $arr1;
//echo $arr2;
var_dump($arr1); //查看变量的类型及内容<=>console.dir  仅用于测试
var_dump($arr2); //查看变量的类型及内容<=>console.dir  仅用于测试

//练习：创建一个PHP数组，保存5个学生成绩数字，输出在一个UL>LI中   提示：使用for循环遍历数组
echo '<hr>';

$scoreList = [95, 88, 76, 35, 75];
echo '<ul>';
for($i=0; $i<count($scoreList); $i++){
	echo "<li>$scoreList[$i]</li>";
}
echo '</ul>';

echo '<hr>';

$arr4 = [10,'Tom',5000, true];  //索引数组
//var_dump($arr4);
$arr5 = [
			'eid'=>11, 
			'ename'=>'Mary',
			'salary'=>6000,
			'isMarried'=>true
		];
//var_dump($arr5);
//echo $arr5['ename'];
//echo $arr5['salary'];
/*foreach($arr5 as $v){
	echo "$v<br>";
}*/
foreach($arr5 as $k=>$v){
	echo "$k - $v<br>";
}
echo '<hr>';

$arr6 = [];
$arr6[0] = 10;
$arr6[1] = 11;
$arr6[count($arr6)] = 12;
$arr6[count($arr6)] = 13;
$arr6[] = 14;	//向数组尾部追加新元素
$arr6[] = 15;
var_dump($arr6);

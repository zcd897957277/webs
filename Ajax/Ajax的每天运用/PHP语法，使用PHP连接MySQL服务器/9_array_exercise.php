<?php
/**
练习：创建一个空数组，向其中添加4个新的书籍记录，每个书籍包含书名、价格、出版日期、是否特价；把上述数据输出在一个TABLE中。
**/

$emp = ['age'=>20];
##echo $emp[age];  //单引号不能省略
//echo $emp['age'];
//echo '年龄为：'.$emp['age'];
echo "年龄为：$emp[age]";	//单引号必须省略


$bookList = [];
$bookList[] = ['name'=>'三国志','price'=>3.5,'pubDate'=>11324134334,'isOnSale'=>true];
$bookList[] = ['name'=>'西游记','price'=>3.6,'pubDate'=>12324134334,'isOnSale'=>false];
$bookList[] = ['name'=>'水浒传','price'=>3.7,'pubDate'=>13324134334,'isOnSale'=>true];
$bookList[] = ['name'=>'红楼梦','price'=>3.8,'pubDate'=>14324134334,'isOnSale'=>false];

//var_dump($bookList);
echo '<table border="1" width="100%">';
echo '  <tbody>';
foreach($bookList as $book){
	echo "<tr>";
	echo "  <td>$book[name]</td>";
	echo "  <td>$book[price]</td>";
	echo "  <td>$book[pubDate]</td>";
	echo "  <td>$book[isOnSale]</td>";
	echo "</tr>";
}
echo '  </tbody>';
echo '</table>';

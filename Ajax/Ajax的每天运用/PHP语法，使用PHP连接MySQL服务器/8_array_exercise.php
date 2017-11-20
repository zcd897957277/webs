<?php
/**
练习：创建一个空数组，向其中添加4个新的书籍记录，每个书籍包含书名、价格、出版日期、是否特价；把上述数据输出在一个TABLE中。
**/
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
	
	$n = $book['name'];
	echo "  <td>$n</td>";
	
	$p = $book['price'];
	echo "  <td>$p</td>";
	
	$d = $book['pubDate'];
	echo "  <td>$d</td>";
	
	$s = $book['isOnSale'];
	$s = $s?'是':'否';
	echo "  <td>$s</td>";

	echo "</tr>";
}
echo '  </tbody>';
echo '</table>';
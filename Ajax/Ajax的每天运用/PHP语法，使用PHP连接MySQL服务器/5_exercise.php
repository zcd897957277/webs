<?php
$msg = 'hello';
$stuList = [
	[101,'Tom', 90, 80],
	[102,'Mary', 91, 22],
	[103,'John', 92, 34],
	[104,'Scott', 94, 81]
];
?>
<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
 </head>
 <body>
   <hr>
   <table width="100%" border="1">
     <thead>
     	<tr>
     		<th>编号</th>
     		<th>姓名</th>
     		<th>语文</th>
     		<th>数学</th>
     	</tr>
     </thead>
	 <tbody>
		<?php
		//count(数组)：返回指定数组的元素个数
		for($i=0; $i<count($stuList); $i++){
			$stu = $stuList[$i];
			echo '<tr>';
			//PHP字符串拼接不能使用+
			echo '	<td>'.$stu[0].'</td>';
			echo '	<td>'.$stu[1].'</td>';
			echo '	<td>'.$stu[2].'</td>';
			echo '	<td>'.$stu[3].'</td>';
			echo '</tr>';
		}
		?>
	 </tbody>
   </table>
   <hr>
   <?php
   echo $msg;
   //echo $stuList;  //Array => String
   ?>
 </body>
 </html>

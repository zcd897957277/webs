<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
 </head>
 <body>
   <hr>
   <table width="100%" border="1">
     <tbody>
		<?php
		for($i=1; $i<10; $i++){
		  echo '<tr>';
		  for($j=1; $j<=$i; $j++){
			echo '<td>';
			echo $i;
			echo '*';
			echo $j;
			echo '=';
			echo $i*$j;
			echo '</td>';
		  }
		  echo '</tr>';
		}
		?>
	 </tbody>
   </table>
 </body>
 </html>

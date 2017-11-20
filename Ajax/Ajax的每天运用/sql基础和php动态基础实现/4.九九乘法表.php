<!doctype html>
<html>
<head>
<meta charset="utf-8">
<!-- TemplateBeginEditable name="doctitle" -->
<title>无标题文档</title>
<!-- TemplateEndEditable -->
<!-- TemplateBeginEditable name="head" -->
<!-- TemplateEndEditable -->
</head>

<body>
<h1>九九乘法表</h1>
	<?php
	for($i=1; $i<10; $i++){
		for($j=1; $j<=i; $j++){
			echo('jxi=$i*$j \t');
		}
		echo('<br>');
	}
	?>
</body>
</html>

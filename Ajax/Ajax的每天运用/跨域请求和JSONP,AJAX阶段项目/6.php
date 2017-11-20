<?php
header('Content-Type: application/javascript');

$cb = $_REQUEST['callback'];

$arr = ['ename'=>'Smith', 'age'=>30];
$str = json_encode($arr);


sleep(5);
echo $cb.'(' .$str. ')' ;   //f1({"ename":"Tom","age":20})
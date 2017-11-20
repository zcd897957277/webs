<?php
//header('Content-Type: application/json');
header('Content-Type: application/javascript');

$cb = $_REQUEST['callback'];

$arr = ['ename'=>'King', 'age'=>50];
$str = json_encode($arr);

echo $cb.'(' .$str. ')' ;   //f1({"ename":"Tom","age":20})
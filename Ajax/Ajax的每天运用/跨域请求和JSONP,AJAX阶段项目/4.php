<?php
//header('Content-Type: application/json');
header('Content-Type: application/javascript');


$arr = ['ename'=>'Tom', 'age'=>20];
$str = json_encode($arr);

echo 'doResponse(' .$str. ')' ;   //doResponse({"ename":"Tom","age":20})
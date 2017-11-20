	SET NAMES UTF8;
	DROP DATABASE IF EXISTS tedu;
	CREATE DATABASE tedu CHARSET=UTF8;
	USE tedu;

	CREATE TABLE dept( 	
	  did INT PRIMARY KEY , 	
	  dname VARCHAR(64)
	);
	INSERT INTO dept VALUES
	(10, '市场部'),
	(20, '研发部');

	CREATE TABLE emp( 	
	  eid INT PRIMARY KEY, 	
	  ename VARCHAR(32), 	
	  deptID INT
	);
	INSERT INTO emp VALUES
	(1, 'Tom', 10),
	(2, 'Mary', 10),
	(3, 'Johh', 20);

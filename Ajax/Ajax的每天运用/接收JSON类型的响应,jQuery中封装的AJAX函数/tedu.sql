SET NAMES UTF8;
DROP DATABASE IF EXISTS tedu;
CREATE DATABASE tedu CHARSET=UTF8;
USE tedu;

CREATE TABLE dept(
  did INT PRIMARY KEY AUTO_INCREMENT,
  dname VARCHAR(32)
);
INSERT INTO dept VALUES(10, '市场部');
INSERT INTO dept VALUES(20, '研发部');
INSERT INTO dept VALUES(30, '运营部');

CREATE TABLE emp(
  eid INT PRIMARY KEY AUTO_INCREMENT,
  ename VARCHAR(32),
  salary FLOAT(10,2),
  pic VARCHAR(64),
  deptID INT
);
INSERT INTO emp VALUES(
  NULL,'Tom','6000','img/1.jpg','10'
);
INSERT INTO emp VALUES(
  NULL,'Mary','7000','img/2.jpg','10'
);
INSERT INTO emp VALUES(
  NULL,'John','6500','img/3.jpg','10'
);
INSERT INTO emp VALUES(
  NULL,'King','6600','img/4.jpg','20'
);
INSERT INTO emp VALUES(
  NULL,'Smith','6000','img/5.jpg','20'
);
INSERT INTO emp VALUES(
  NULL,'Scott','8000','img/6.jpg','30'
);
INSERT INTO emp VALUES(
  NULL,'Tiger','9000','img/7.jpg','30'
);
INSERT INTO emp VALUES(
  NULL,'Joe','6800','img/8.jpg','30'
);

SELECT * FROM emp;

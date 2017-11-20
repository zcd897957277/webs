#设置SQL语句的编码
SET NAMES UTF8;
#试着删除数据库tarena				
DROP DATABASE IF EXISTS tarena;
#创建数据库tarena
CREATE DATABASE tarena CHARSET=UTF8;
#进入数据库tarena
USE tarena;


#创建部门信息表dept(did, name,location)
CREATE TABLE dept(
  did INT PRIMARY KEY,
  name VARCHAR(3),
  location VARCHAR(5)
);
#添加三个部门记录，如10-市场部-北京  20-研发部-上海 30-运营部-杭州
INSERT INTO dept VALUES(
  '10','市场部','北京'
);
INSERT INTO dept VALUES(
  '20','研发部','上海'
);
INSERT INTO dept VALUES(
  '30','运营部','杭州'
);


#创建员工信息表  emp(eid,name,sex,salary,birthday,phone,deptID)
CREATE TABLE emp(
  eid INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(4),
  sex VARCHAR(1),
  salary FLOAT(9,2),	#9999999.99
  birthday DATE,
  phone VARCHAR(11),	#电话不能用INT
  deptID INT		#所在部门的编号
);
#添加6个员工记录，每个部门有两三个员工
INSERT INTO emp VALUES(
  NULL,'旭旭','男','888888','1998-8-8','13501234567','30'
);
INSERT INTO emp VALUES(
  NULL,'东东','男','888887','1998-8-7','13501234567','20'
);
INSERT INTO emp VALUES(
  NULL,'龙龙','女','888886','1998-8-6','13501234567','20'
);
INSERT INTO emp VALUES(
  NULL,'胖胖','男','888885','1998-8-5','13501234567','10'
);
INSERT INTO emp VALUES(
  NULL,'婷婷','女','888884','1998-8-4','13501234567','10'
);

#删除10号部门，及下面的员工
DELETE FROM emp WHERE deptID=10;
DELETE FROM dept WHERE did=10;

#查询出所有的部门记录
#SELECT did,name,location FROM dept;
#查询出所有的员工记录
#SELECT * FROM emp;
#查询出20号部门中所有的员工记录
#SELECT * FROM emp WHERE deptID=20;
#查询出“研发部”所有的员工记录
SELECT * FROM emp 
WHERE deptID=(
  SELECT did FROM dept WHERE name='研发部'
); 

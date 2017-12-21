/*
*多行注释
*/
#单行注释

#SHOW DATABASES;
#USE phpmyadmin;
#SHOW TABLES;

/**服务器 => DATABASE => TABLE => ROW => COLUMN**/

#指定后续的SQL语句所用的编码方式
SET NAMES UTF8;		#没有-
#试着删除一个指定的数据库(如果存在的话)
DROP DATABASE IF EXISTS jd;
#创建指定的数据库，声明保存数据所用的编码方式
CREATE DATABASE jd CHARSET=UTF8;
#进入刚刚创建的库
USE jd;

#创建保存产品的表：product
CREATE TABLE product(
  pid INT PRIMARY KEY AUTO_INCREMENT,	#主键列，不能出现重复值，自增列
  name VARCHAR(64),	#变长字符串
  pic VARCHAR(64),	#产品图片  img/234.jpg
  price FLOAT(8,2),	#999999.99
  birthday DATE,	#出厂日期
  isOnSale BOOLEAN	#是否特价
);

#向产品表中插入记录行
INSERT INTO product VALUES(
  NULL,'Pepsi 600ml','img/1.jpg','3.5','2016-3-5','0'
);
INSERT INTO product VALUES(
  NULL,'Sprite 600ml','img/2.jpg','3.6','2016-3-6','1'
);
INSERT INTO product VALUES(
  NULL,'Fanta 600ml','img/3.jpg','3.7','2016-3-7','0'
);
INSERT INTO product VALUES(
  NULL,'Wanglaoji 600ml','img/4.jpg','3.8','2016-3-8','1'
);
INSERT INTO product VALUES(
  NULL,'鲜橙多 600ml','img/10.jpg','10.0','2016-3-10','1'
);
INSERT INTO product VALUES(
  NULL,'Wanglaoji 600ml','img/4.jpg','3.8','2016-3-8','1'
);

#删除指定的记录行
###DELETE FROM product;  ##删除所有记录行
DELETE FROM product WHERE pid=2;  #删除满足条件的行

#修改指定的记录行
UPDATE product 
SET name='加多宝600ml',pic='img/6.jpg',price=6.6 
WHERE pid=6;

#查询所有的产品记录
SELECT * FROM product;		#*指代所有列
#查询所有产品的名称/价格/图片
#SELECT name,price,pic FROM product;
#查看6号产品的所有列
#SELECT * FROM product
#WHERE pid=6;
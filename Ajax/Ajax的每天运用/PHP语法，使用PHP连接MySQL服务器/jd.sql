#设置SQL语句的编码方式
SET NAMES UTF8;
#删除数据库jd
DROP DATABASE IF EXISTS jd;
#重建数据库jd，数据编码使用UTF8			
CREATE DATABASE jd CHARSET=UTF8;
#进入数据库jd
USE jd;

#创建商品分类表：
CREATE TABLE category(
  cid INT PRIMARY KEY,
  name VARCHAR(8),
  count INT
);
#插入几条商品分类记录，如10-手机-500、20-相机-350
INSERT INTO category VALUES(
  '10','手机','500'
);
INSERT INTO category VALUES(
  '20','相机','350'
);

#创建商品信息表：
CREATE TABLE goods(
  gid INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(64),
  price FLOAT(8,2),	#999999.99
  pic VARCHAR(64),
  birthday BIGINT,	#项目中都使用整数代替日期
  categoryID INT
);
#插入几条商品记录：
INSERT INTO goods VALUES(
  NULL,'小米4','1500','img/1.jpg','1347634734342','10'
);
INSERT INTO goods VALUES(
  NULL,'iPhone6','2500','img/2.jpg','1547634734343','10'
);
INSERT INTO goods VALUES(
  NULL,'NikonD200','8500','img/3.jpg','1147634734342','20'
);
INSERT INTO goods VALUES(
  NULL,'SonyA200','4500','img/4.jpg','2247634734343','20'
);

#查询所有的商品类别
SELECT cid,name,count FROM category;
#查询所有的商品
SELECT * FROM goods;
#查询“手机”类别下的所有商品
SELECT * FROM goods 
WHERE categoryID=(
  SELECT cid FROM category WHERE name='手机'
); 

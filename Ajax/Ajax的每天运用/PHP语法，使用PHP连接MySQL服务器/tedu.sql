#设置SQL语句编码方式
SET NAMES UTF8;
#删除一个数据库tedu
DROP DATABASE IF EXISTS tedu;
#创建一个数据库tedu
CREATE DATABASE tedu CHARSET=UTF8;
#进入数据库tedu
USE tedu;
#创建一个保存注册用户信息的表：
CREATE TABLE user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(32),
  pic VARCHAR(64),
  registerDate BIGINT,
  isAdmin BOOLEAN
);
#添加几行记录
INSERT INTO user VALUES(
 NULL,'tom','img/1.jpg','1324213433433','1'
);
INSERT INTO user VALUES(
 NULL,'mary','img/2.jpg','1424213433433','0'
);
INSERT INTO user VALUES(
 NULL,'john','img/3.jpg','1524213433433','1'
);
#查询出所有用户信息
SELECT * FROM user;

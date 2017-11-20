#设置SQL语句编码方式
SET NAMES UTF8;
#删除数据库tedu
DROP DATABASE IF EXISTS tedu;
#重建数据库tedu
CREATE DATABASE tedu CHARSET=UTF8;
#进入数据库tedu
USE tedu;

#创建留言表 
CREATE TABLE msg(
  mid INT PRIMARY KEY AUTO_INCREMENT,
  userName VARCHAR(32),
  phone VARCHAR(11),
  content VARCHAR(1024),
  pubTime BIGINT
);
#试着创建两条留言记录
INSERT INTO msg VALUES(
  NULL,'大旭','13501234567','昨天我去看星星啦','134134213423'
);
INSERT INTO msg VALUES(
  NULL,'东东','13501234568','我也去啦','141134213423'
);
#查询出所有留言
SELECT * FROM msg;

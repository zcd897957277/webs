SET NAMES UTF8;
DROP DATABASE IF EXISTS autohome;
CREATE DATABASE autohome CHARSET=UTF8;
USE autohome;

CREATE TABLE auto(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(64),
  price FLOAT(10,2),
  count INT,
  pic VARCHAR(64)
);
INSERT INTO auto VALUES(
  NULL,'全新捷达','80000','2342','cars/8_1.jpg'
);
INSERT INTO auto VALUES(
  NULL,'POLO','60000','1234','cars/8_3.jpg'
);
INSERT INTO auto VALUES(
  NULL,'思域','120000','9823','cars/8_4.jpg'
);
SELECT * FROM auto;


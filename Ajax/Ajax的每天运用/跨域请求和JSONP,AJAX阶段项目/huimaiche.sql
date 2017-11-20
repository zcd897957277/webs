SET NAMES UTF8;
DROP DATABASE IF EXISTS huimaiche;
CREATE DATABASE huimaiche CHARSET=UTF8;
USE huimaiche;

CREATE TABLE car(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  cname VARCHAR(64),
  price FLOAT(10,2),
  count INT,
  pic VARCHAR(64),
  type VARCHAR(8)
);
INSERT INTO car VALUES(
  NULL,'全新捷达','80000','2342','cars/8_1.jpg','lt8'
);
INSERT INTO car VALUES(
  NULL,'景逸S5','50000','831','cars/8_2.jpg','lt8'
);
INSERT INTO car VALUES(
  NULL,'POLO','60000','1234','cars/8_3.jpg','lt8'
);
INSERT INTO car VALUES(
  NULL,'思域','120000','923','cars/15_1.jpg','lt15'
);
INSERT INTO car VALUES(
  NULL,'英朗','130000','3113','cars/15_2.jpg','lt15'
);
INSERT INTO car VALUES(
  NULL,'全新朗逸','140000','4413','cars/15_3.jpg','lt15'
);
INSERT INTO car VALUES(
  NULL,'A6L','350000','711','cars/30_1.jpg','lt30'
);
INSERT INTO car VALUES(
  NULL,'XRV','250000','1831','cars/30_2.jpg','lt30'
);
INSERT INTO car VALUES(
  NULL,'轩逸','280000','231','cars/30_3.jpg','lt30'
);
INSERT INTO car VALUES(
  NULL,'途观','250000','46785','cars/suv_1.jpg','suv'
);
INSERT INTO car VALUES(
  NULL,'Q5','350000','761','cars/suv_2.jpg','suv'
);
INSERT INTO car VALUES(
  NULL,'CRV','220000','1134','cars/suv_3.jpg','suv'
);

SELECT * FROM car;
SET NAMES UTF8;
DROP DATABASE IF EXISTS jd;
CREATE DATABASE jd CHARSET=UTF8;
USE jd;

CREATE TABLE jd_user(
  uid INT PRIMARY KEY AUTO_INCREMENT, 
  uname VARCHAR(32),
  upwd VARCHAR(32)
);
INSERT INTO jd_user VALUES
('1','qiangdong','123456'),
('2','naicha','456789');

CREATE TABLE jd_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  pname VARCHAR(64),
  price FLOAT(10,2),
  pic VARCHAR(64)
);

CREATE TABLE jd_cart(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  userID INT   /*必须参考jd_user.uid*/
);
INSERT INTO jd_cart VALUES
(1, 1),
(2, 2);
   
CREATE TABLE jd_cart_detail(
  did  INT PRIMARY KEY AUTO_INCREMENT,
  cartID INT,
  productID INT,
  count INT
);
INSERT INTO jd_cart_detail VALUES
(NULL, 1, 10, 3),
(NULL, 1, 12, 1),
(NULL, 1, 30, 2),
(NULL, 2, 5, 1),
(NULL, 2, 15, 1);


INSERT INTO jd_product VALUES
(1,'小米 Note 全网通 白色 移动联通电信4G手机 双卡双待',1199.00,'images/phone/phone_01.jpg'),
(2,'Apple iPhone 6s (A1700) 16G 玫瑰金色 移动联通电信4G手机',3999.00,'images/phone/phone_02.jpg'),
(3,'PPO R9 4GB+64GB内存版 玫瑰金 全网通4G手机 双卡',2499.00,'images/phone/phone_03.jpg'),
(4,'小米 红米 3S 高配全网通 3GB内存 32GB ROM 经典金色',899.00,'images/phone/phone_04.jpg'),
(5,'金立M6 Plus 香槟金 4GB+64GB版 移动联通电信4G手机 双卡双待',2999.00,'images/phone/phone_05.jpg'),
(6,'Apple iPhone 6s Plus (A1699) 64G 玫瑰金色 移动联通电信4G手机',5799.00,'images/phone/phone_06.jpg'),
(7,'vivo X7 全网通 4GB+64GB 移动联通电信4G手机 双卡双待',2499.00,'images/phone/phone_07.png'),
(8,'小米 红米Note3 高配全网通版 3GB+32GB 金色 移动联通电信4G手机',1099.00,'images/phone/phone_08.jpg'),
(9,'【六个月碎屏换新】荣耀8 4GB+32GB 全网通版 魅海蓝 双镜头，双2.5D玻璃',2499.00,'images/phone/phone_09.jpg'),
(10,'荣耀7 (PLK-AL10) 3GB+64GB内存版 荣耀金 移动联通电信4G手机',1799.00,'images/phone/phone_10.jpg'),
(11,'荣耀 V8 全网通 高配版 4GB+64GB 香槟金 移动联通电信4G手机 双卡双待双通',2799.00,'images/phone/phone_11.jpg'),
(12,'荣耀 畅玩5X 3GB内存版 落日金 移动联通电信4G手机 双卡双待 炫酷指纹',1099.00,'images/phone/phone_12.jpg'),
(13,'Apple iPhone 6 (A1586) 64GB 金色 移动联通电信4G手机',4199.00,'images/phone/phone_13.jpg'),
(14,'TCL 初现 750 雅金 移动联通电信4G手机 双卡双待 后置1600万摄像，美姿拍照！',4199.00,'images/phone/phone_14.jpg'),
(15,'华为 P9 plus 64GB 琥珀灰 移动联通电信4G手机 双卡双待',3988.00,'images/phone/phone_15.jpg'),
(16,'Apple iPhone 5s (A1530) 16GB 金色 移动联通4G手机',2198.00,'images/phone/phone_16.jpg'),
(17,'vivo X7Plus 全网通 4GB+64GB 移动联通电信4G手机 双卡双待 金色',2798.00,'images/phone/phone_17.jpg'),
(18,'华为 畅享5S 金色 移动联通电信4G手机 双卡双待 10万好评手机！',1099.00,'images/phone/phone_18.jpg'),
(19,'Apple iPhone 6 Plus (A1524) 16GB 银色 移动联通电信4G手机',3899.00,'images/phone/phone_19.jpg'),
(20,'华为 麦芒5 全网通 4GB+64GB版 香槟金 移动联通电信4G手机 双卡双待',2599.00,'images/phone/phone_20.jpg'),
(21,'小米5 全网通 标准版 3GB内存 32GB ROM 白色 移动联通电信4G手机',1799.00,'images/phone/phone_21.jpg'),
(22,'华为 P9 全网通 3GB+32GB版 流光金 移动联通电信4G手机 双卡双待 麒麟955',3188.00,'s/phone/phone_22.jpg'),
(23,'金立 金钢 标准版 爵士金 移动联通电信4G手机 双卡双待 4G全网通',999.00,'images/phone/phone_23.jpg'),
(24,'360手机 N4 全网通 4GB+32GB 阳光白 移动联通电信4G手机 双卡双待',999.00,'es/phone/phone_24.jpg'),
(25,'小米 Max 全网通 标准版 3GB内存 32GB ROM 金色 移动联通电信4G手机',1299.00,'es/phone/phone_25.jpg'),
(26,'华为 P9 全网通 4GB+64GB版 金色 移动联通电信4G手机 双卡双待 后置1200万',3688.00,'es/phone/phone_26.jpg'),
(27,'乐视（Le）乐2（X620）32GB 原力金 移动联通电信4G手机 双卡双待 5.5英寸',988.00,'images/phone/phone_27.jpg'),
(28,'努比亚(nubia)【3+64GB】小牛5 Z11mini 黑色 移动联通电信4G手机',1299.00,'ges/phone/phone_28.jpg'),
(29,'乐视（Le）乐2Pro 32GB 金色 移动联通电信4G手机 双卡双待 5.5英寸In-Cell屏',1399.00,'ges/phone/phone_29.jpg'),
(30,'华为 Mate 8 3GB+32GB版 玫瑰金 移动联通电信4G手机 双卡双待 麒麟950芯片',2799.00,'ges/phone/phone_30.jpg'),
(31,'小米 4c 标准版 全网通 白色 移动联通电信4G手机 双卡双待 高通骁龙808畅销机',799.00,'images/phone/phone_31.jpg'),
(32,'vivo X7 全网通 4GB+64GB 移动联通电信4G手机 双卡双待 星空灰 vivox7',2498.00,'ages/phone/phone_32.jpg'),
(33,'联想 乐檬3 （K32C36）16GB 金色 移动4G手机 双卡双待 刀锋致敬经典',599.00,'images/phone/phone_33.jpg'),
(34,'华为 荣耀 畅玩4X 晨曦金 移动联通电信4G手机 双卡双待 5.5英寸大屏看片利器',749.00,'mages/phone/phone_34.jpg'),
(35,'三星 Galaxy On5（G5500）金色 移动联通4G手机 真皮质感后盖，2600毫安大容量',699.00,'mages/phone/phone_35.jpg'),
(36,'OPPO A37 2GB+16GB内存版 玫瑰金 全网通4G手机 双卡双待 【赠品任你选】',1299.00,'images/phone/phone_36.jpg');


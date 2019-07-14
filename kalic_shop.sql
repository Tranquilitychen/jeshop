/*
Navicat MySQL Data Transfer

Source Server         : kalic
Source Server Version : 80012
Source Host           : 127.0.0.1:3306
Source Database       : kalic_shop

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2019-07-14 18:29:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `addrid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `addressee` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `address` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  PRIMARY KEY (`addrid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('1', '1', '荒', '13788886666', '四川省成都市成都大学');
INSERT INTO `address` VALUES ('2', '2', '张三', '13788886666', '四川省成都市电子科技大学');
INSERT INTO `address` VALUES ('3', '3', '李四', '13788886666', '北京市朝阳区复兴小区3330号');
INSERT INTO `address` VALUES ('4', '4', '王五', '13788886666', '湖北');
INSERT INTO `address` VALUES ('5', '1', '赵六', '13788886666', '湖南');
INSERT INTO `address` VALUES ('6', '1', '张斌', '13788886666', '广西');
INSERT INTO `address` VALUES ('7', '1', '唐伯虎', '13788886666', '长安');
INSERT INTO `address` VALUES ('9', '1', '猪猪侠', '13333335555', '积木世界');
INSERT INTO `address` VALUES ('10', '2', '叶凡', '15721663333', '天庭');
INSERT INTO `address` VALUES ('11', '2', '黑皇', '13399998888', '北斗');
INSERT INTO `address` VALUES ('13', '1', '唐三', '13344441111', '斗罗大陆');
INSERT INTO `address` VALUES ('15', '15', '小紫', '13344445555', '天庭');
INSERT INTO `address` VALUES ('16', '15', '黑皇', '12322223333', '紫山');
INSERT INTO `address` VALUES ('17', '15', '姬紫月', '13355556666', '姬家');

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(10) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `password` varchar(16) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `email` varchar(30) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `registerTime` datetime NOT NULL,
  `state` int(11) NOT NULL,
  `validateCode` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `email` (`email`) USING BTREE COMMENT 'email唯一',
  UNIQUE KEY `username` (`username`) COMMENT '用户名唯一'
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES ('1', '123', '123', '13211231231@qq.com', '2019-07-02 10:22:41', '1', '1');
INSERT INTO `customer` VALUES ('2', 'test', '123', '1832112312@163.com', '2019-07-02 10:22:41', '1', '2');
INSERT INTO `customer` VALUES ('3', 'haha', '123', '11232112312@qq.com', '2019-07-02 10:22:41', '1', '3');
INSERT INTO `customer` VALUES ('4', 'nsu', '123', '123521123126@qq.com', '2019-07-02 10:22:41', '1', '4');
INSERT INTO `customer` VALUES ('5', 'aa', '123', '10842112312456@qq.com', '2019-07-02 20:42:01', '1', '5');
INSERT INTO `customer` VALUES ('15', '叶凡', 'jeshop888_', '182112312@163.com', '2019-07-12 13:58:15', '1', '61881bb7fe5240ddaae8999aa25b7eb2');

-- ----------------------------
-- Table structure for customerinfo
-- ----------------------------
DROP TABLE IF EXISTS `customerinfo`;
CREATE TABLE `customerinfo` (
  `uid` int(11) NOT NULL,
  `sex` int(11) DEFAULT NULL,
  `shopName` varchar(13) CHARACTER SET gbk COLLATE gbk_chinese_ci DEFAULT NULL,
  `headSculpture` varchar(255) DEFAULT NULL,
  `birth` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of customerinfo
-- ----------------------------
INSERT INTO `customerinfo` VALUES ('1', '2', '懒散的不行', '/jeshop/files/1150012109338316800.jpg', '1787-01-17 08:00:00');
INSERT INTO `customerinfo` VALUES ('2', '1', '废物的要命', '/jeshop/files/1149694549090766848.jpg', null);
INSERT INTO `customerinfo` VALUES ('3', '2', '没救了你', '/jeshop/files/1149694549090766848.jpg', null);
INSERT INTO `customerinfo` VALUES ('15', '1', '九龙拉棺我最行', '/jeshop/files/1149694549090766848.jpg', '1998-01-01 08:00:00');

-- ----------------------------
-- Table structure for fashion_product
-- ----------------------------
DROP TABLE IF EXISTS `fashion_product`;
CREATE TABLE `fashion_product` (
  `fashionid` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  PRIMARY KEY (`fashionid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of fashion_product
-- ----------------------------
INSERT INTO `fashion_product` VALUES ('1', '38');
INSERT INTO `fashion_product` VALUES ('2', '15');
INSERT INTO `fashion_product` VALUES ('3', '34');
INSERT INTO `fashion_product` VALUES ('4', '39');
INSERT INTO `fashion_product` VALUES ('5', '40');
INSERT INTO `fashion_product` VALUES ('6', '42');
INSERT INTO `fashion_product` VALUES ('7', '41');
INSERT INTO `fashion_product` VALUES ('8', '43');

-- ----------------------------
-- Table structure for favorites
-- ----------------------------
DROP TABLE IF EXISTS `favorites`;
CREATE TABLE `favorites` (
  `fid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `fpis` int(11) DEFAULT NULL,
  `fdate` datetime DEFAULT NULL,
  PRIMARY KEY (`fid`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of favorites
-- ----------------------------
INSERT INTO `favorites` VALUES ('5', '2', '1', '1', null);
INSERT INTO `favorites` VALUES ('6', '2', '2', '1', null);
INSERT INTO `favorites` VALUES ('7', '2', '3', '1', null);
INSERT INTO `favorites` VALUES ('8', '3', '1', '1', null);
INSERT INTO `favorites` VALUES ('9', '3', '2', '1', null);
INSERT INTO `favorites` VALUES ('10', '3', '3', '1', null);
INSERT INTO `favorites` VALUES ('11', '1', '46', null, '2019-07-13 23:21:40');
INSERT INTO `favorites` VALUES ('12', '1', '38', null, '2019-07-14 10:09:19');
INSERT INTO `favorites` VALUES ('13', '1', '43', null, '2019-07-14 10:09:24');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `orderid` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `uid` int(11) NOT NULL,
  `addrid` int(11) NOT NULL,
  `money` double NOT NULL,
  `createTime` datetime DEFAULT NULL,
  `payTime` datetime DEFAULT NULL,
  `deliveryTime` datetime DEFAULT NULL,
  `closingTime` datetime DEFAULT NULL,
  `state` int(11) NOT NULL,
  PRIMARY KEY (`orderid`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('1149144685197918208', '1', '9', '1149', '2019-07-11 10:33:38', '2019-07-13 18:21:46', null, null, '0');
INSERT INTO `order` VALUES ('1149161214140481536', '1', '9', '5071', '2019-07-11 11:39:18', '2019-07-11 11:46:52', null, null, '0');
INSERT INTO `order` VALUES ('1149163835999911936', '1', '1', '5200', '2019-07-11 11:49:44', '2019-07-11 11:49:46', null, null, '1');
INSERT INTO `order` VALUES ('1149170561004339200', '1', '9', '423', '2019-07-11 12:16:27', '2019-07-11 12:16:31', null, '2019-07-13 18:23:24', '1');
INSERT INTO `order` VALUES ('1149173495033233408', '1', '6', '452', '2019-07-11 12:28:06', '2019-07-11 12:28:09', null, null, '2');
INSERT INTO `order` VALUES ('1149174261483569152', '1', '9', '208', '2019-07-11 12:31:09', '2019-07-11 12:31:12', '2019-07-13 18:17:19', null, '3');
INSERT INTO `order` VALUES ('1149570484745011200', '15', '15', '7600', '2019-07-12 14:45:36', '2019-07-12 14:46:10', null, null, '1');
INSERT INTO `order` VALUES ('1150221070339407872', '1', '9', '120', '2019-07-14 09:50:48', '2019-07-14 09:50:50', null, null, '1');
INSERT INTO `order` VALUES ('1150298891141251072', '1', '9', '1306', '2019-07-14 15:00:02', null, null, null, '0');

-- ----------------------------
-- Table structure for orderitem
-- ----------------------------
DROP TABLE IF EXISTS `orderitem`;
CREATE TABLE `orderitem` (
  `itemid` int(11) NOT NULL AUTO_INCREMENT,
  `orderid` varchar(255) NOT NULL,
  `pid` int(11) NOT NULL,
  `pnumber` int(11) NOT NULL,
  PRIMARY KEY (`itemid`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of orderitem
-- ----------------------------
INSERT INTO `orderitem` VALUES ('1', '1149144685197918208', '44', '3');
INSERT INTO `orderitem` VALUES ('2', '1149144685197918208', '40', '4');
INSERT INTO `orderitem` VALUES ('3', '1149144685197918208', '38', '2');
INSERT INTO `orderitem` VALUES ('4', '1149161214140481536', '34', '4');
INSERT INTO `orderitem` VALUES ('5', '1149161214140481536', '46', '7');
INSERT INTO `orderitem` VALUES ('6', '1149161214140481536', '42', '3');
INSERT INTO `orderitem` VALUES ('7', '1149161214140481536', '15', '1');
INSERT INTO `orderitem` VALUES ('8', '1149163835999911936', '34', '3');
INSERT INTO `orderitem` VALUES ('9', '1149163835999911936', '38', '4');
INSERT INTO `orderitem` VALUES ('10', '1149163835999911936', '15', '4');
INSERT INTO `orderitem` VALUES ('11', '1149170561004339200', '40', '1');
INSERT INTO `orderitem` VALUES ('12', '1149170561004339200', '15', '1');
INSERT INTO `orderitem` VALUES ('13', '1149170561004339200', '38', '1');
INSERT INTO `orderitem` VALUES ('14', '1149173495033233408', '41', '3');
INSERT INTO `orderitem` VALUES ('15', '1149173495033233408', '40', '3');
INSERT INTO `orderitem` VALUES ('16', '1149173495033233408', '42', '1');
INSERT INTO `orderitem` VALUES ('17', '1149174261483569152', '41', '1');
INSERT INTO `orderitem` VALUES ('18', '1149174261483569152', '43', '1');
INSERT INTO `orderitem` VALUES ('19', '1149570484745011200', '35', '4');
INSERT INTO `orderitem` VALUES ('20', '1149570484745011200', '34', '2');
INSERT INTO `orderitem` VALUES ('21', '1150221070339407872', '1', '1');
INSERT INTO `orderitem` VALUES ('22', '1150221070339407872', '15', '1');
INSERT INTO `orderitem` VALUES ('23', '1150298891141251072', '38', '2');
INSERT INTO `orderitem` VALUES ('24', '1150298891141251072', '48', '2');
INSERT INTO `orderitem` VALUES ('25', '1150298891141251072', '15', '2');
INSERT INTO `orderitem` VALUES ('26', '1150298891141251072', '40', '2');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `pname` varchar(50) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `pimg` varchar(50) DEFAULT NULL,
  `describe` varchar(50) DEFAULT NULL,
  `ptype` int(11) DEFAULT NULL,
  `ptime` datetime DEFAULT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', 'riyongpin_01', '20', '100', '/jeshop/image/shenghuo/riyongpin_01.jpg', '吹风机', '1', '2019-07-03 12:39:40');
INSERT INTO `product` VALUES ('2', 'riyongpin_02', '30', '200', '/jeshop/image/shenghuo/riyongpin_02.jpg', '电烤箱', '1', '2019-07-03 12:39:49');
INSERT INTO `product` VALUES ('3', 'riyongpin_03', '40', '300', '/jeshop/image/shenghuo/riyongpin_03.jpg', '电烤箱', '1', '2019-07-02 12:39:54');
INSERT INTO `product` VALUES ('4', 'riyongpin_04', '50', '400', '/jeshop/image/shenghuo/riyongpin_04.jpg', '日用品4', '1', '2019-07-08 12:57:54');
INSERT INTO `product` VALUES ('5', 'riyongpin_05', '60', '500', '/jeshop/image/shenghuo/riyongpin_05.jpg', '日用品5', '1', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('6', 'riyongpin_06', '70', '600', '/jeshop/image/shenghuo/riyongpin_06.jpg', '日用品6', '1', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('7', 'riyongpin_07', '80', '700', '/jeshop/image/shenghuo/riyongpin_07.jpg', '日用品7', '1', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('8', 'riyongpin_08', '90', '800', '/jeshop/image/shenghuo/riyongpin_08.jpg', '日用品8', '1', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('9', 'riyongpin_09', '100', '900', '/jeshop/image/shenghuo/riyongpin_09.jpg', '日用品9', '1', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('10', 'riyongpin_10', '110', '1000', '/jeshop/image/shenghuo/riyongpin_10.jpg', '日用品10', '1', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('11', 'riyongpin_11', '120', '1100', '/jeshop/image/shenghuo/riyongpin_11.jpg', '日用品11', '1', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('12', 'riyongpin_12', '130', '1200', '/jeshop/image/shenghuo/riyongpin_12.jpg', '日用品12', '1', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('13', 'food_1', '55', '10', '/jeshop/image/food/food_1.jpg', '食物1', '2', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('14', 'food_2', '60', '15', '/jeshop/image/food/food_2.jpg', '食物2', '2', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('15', 'food_3', '65', '20', '/jeshop/image/food/food_3.jpg', '食物3', '2', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('16', 'food_4', '70', '25', '/jeshop/image/food/food_4.jpg', '食物4', '2', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('17', 'food_5', '75', '30', '/jeshop/image/food/food_5.jpg', '食物5', '2', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('18', 'food_6', '80', '35', '/jeshop/image/food/food_6.jpg', '食物6', '2', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('19', 'food_7', '85', '40', '/jeshop/image/food/food_7.jpg', '食物7', '2', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('20', 'food_8', '90', '45', '/jeshop/image/food/food_8.jpg', '食物8', '2', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('21', 'food_9', '95', '50', '/jeshop/image/food/food_9.jpg', '食物9', '2', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('22', 'food_10', '100', '55', '/jeshop/image/food/food_10.jpg', '食物10', '2', '2019-07-08 12:58:36');
INSERT INTO `product` VALUES ('23', 'food_11', '105', '60', '/jeshop/image/food/food_11.jpg', '食物11', '2', '2019-07-08 12:59:37');
INSERT INTO `product` VALUES ('24', 'food_12', '110', '65', '/jeshop/image/food/food_12.jpg', '食物12', '2', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('25', 'food_13', '55', '10', '/jeshop/image/food/food_13.png', '食物13', '2', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('26', 'food_14', '60', '15', '/jeshop/image/food/food_14.png', '食物14', '2', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('27', 'food_15', '65', '20', '/jeshop/image/food/food_15.png', '食物15', '2', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('28', 'food_16', '70', '25', '/jeshop/image/food/food_16.png', '食物16', '2', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('29', 'food_17', '75', '30', '/jeshop/image/food/food_17.jpg', '食物17', '2', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('30', 'food_18', '80', '35', '/jeshop/image/food/food_18.jpg', '食物18', '2', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('31', 'food_19', '85', '40', '/jeshop/image/food/food_19.jpg', '食物19', '2', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('32', 'food_20', '90', '45', '/jeshop/image/food/food_20.jpg', '食物20', '2', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('33', 'jewelry_1', '15', '1100', '/jeshop/image/jewelry/jewelry_1.jpg', '首饰1', '3', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('34', 'jewelry_2', '20', '1200', '/jeshop/image/jewelry/jewelry_2.jpg', '首饰2', '3', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('35', 'jewelry_3', '25', '1300', '/jeshop/image/jewelry/jewelry_3.jpg', '首饰3', '3', '2019-07-08 12:59:37');
INSERT INTO `product` VALUES ('36', 'jewelry_4', '30', '1400', '/jeshop/image/jewelry/jewelry_4.jpg', '首饰4', '3', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('37', 'jewelry_5', '35', '1500', '/jeshop/image/jewelry/jewelry_5.jpg', '首饰5', '3', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('38', '22niang', '30', '380', '/jeshop/image/bilibili/22niang.png', '22娘抱枕，你值得拥有', '4', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('39', '33niang', '40', '380', '/jeshop/image/bilibili/33niang.png', '33娘抱枕，与众不同的感觉', '4', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('40', 'baibao', '120', '23', '/jeshop/image/bilibili/baibao.png', '哔哩哔哩特制女士手提袋（白色），让您便捷出行', '4', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('41', 'gongzai', '60', '120', '/jeshop/image/bilibili/gongzai.png', 'bilibili小电视公仔，公仔在手，天下我有', '4', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('42', 'heibao', '120', '23', '/jeshop/image/bilibili/heibao.png', '哔哩哔哩特制女士手提袋（黑色），让您便捷出行', '4', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('43', 'naozhong', '80', '88', '/jeshop/image/bilibili/naozhong.png', 'bilibili小电视闹钟', '4', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('44', 'weiyi', '300', '99', '/jeshop/image/bilibili/weiyi.png', '秋日必备卫衣，给您不一样的温暖', '4', '2019-07-08 12:59:37');
INSERT INTO `product` VALUES ('45', 'xiaodianshibaozheng', '40', '320', '/jeshop/image/bilibili/xiaodianshibaozheng.png', 'bilibili小电视羊驼抱枕，给您不一样的感觉', '4', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('46', 'xiezi', '190', '26', '/jeshop/image/bilibili/xiezi.png', '蓝白款网红鞋，女款', '4', '2019-07-08 12:59:37');
INSERT INTO `product` VALUES ('47', 'zaixiabanben', '50', '800', '/jeshop/image/bilibili/zaixiabanben.png', '坂本手办', '4', '2019-07-08 12:58:37');
INSERT INTO `product` VALUES ('48', '针织衣', '100', '230', '/jeshop/image/bilibili/fashionwomen.jpg', '2019女士最佳款式', '4', '2019-07-08 12:58:37');

-- ----------------------------
-- Table structure for ptype
-- ----------------------------
DROP TABLE IF EXISTS `ptype`;
CREATE TABLE `ptype` (
  `ptype` int(11) NOT NULL AUTO_INCREMENT,
  `tname` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci DEFAULT NULL,
  PRIMARY KEY (`ptype`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of ptype
-- ----------------------------
INSERT INTO `ptype` VALUES ('1', '日用品');
INSERT INTO `ptype` VALUES ('2', '食物');
INSERT INTO `ptype` VALUES ('3', '首饰');
INSERT INTO `ptype` VALUES ('4', 'bilibili周边');

-- ----------------------------
-- Table structure for statistic
-- ----------------------------
DROP TABLE IF EXISTS `statistic`;
CREATE TABLE `statistic` (
  `sid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `pnumber` int(11) NOT NULL,
  `total` double NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of statistic
-- ----------------------------
